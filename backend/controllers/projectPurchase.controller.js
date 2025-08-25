import Stripe from "stripe";
import { Project } from "../models/project.model.js";
import { ProjectPurchase } from "../models/projectPurcahse.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.id;
    const { projectId } = req.body;

    const project = await Project.findById(projectId);
    if (!project)
      return res.status(404).json({ message: "project not found!" });

    // Create a new project purchase record
    const newPurchase = new ProjectPurchase({
      projectId,
      userId,
      amount: project.projectPrice,
      status: "pending",
    });

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: project.projectTitle,
              images: [project.projectThumbnail],
            },
            unit_amount: project.projectPrice * 100, // Amount in paise (lowest denomination)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/project-progress/${projectId}`, // once payment successful redirect to project progress page
      cancel_url: `http://localhost:5173/project-detail/${projectId}`,
      metadata: {
        projectId: projectId,
        userId: userId,
      },
      shipping_address_collection: {
        allowed_countries: ["IN"], // Optionally restrict allowed countries
      },
    });

    if (!session.url) {
      return res
        .status(400)
        .json({ success: false, message: "Error while creating session" });
    }

    // Save the purchase record
    newPurchase.paymentId = session.id;
    await newPurchase.save();

    return res.status(200).json({
      success: true,
      url: session.url, // Return the Stripe checkout URL
    });
  } catch (error) {
    console.log(error);
  }
};

export const stripeWebhook = async (req, res) => {
  let event;

  try {
    const payloadString = JSON.stringify(req.body, null, 2);
    const secret = process.env.WEBHOOK_ENDPOINT_SECRET;

    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret,
    });

    event = stripe.webhooks.constructEvent(payloadString, header, secret);
  } catch (error) {
    console.error("Webhook error:", error.message);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  // Handle the checkout session completed event
  if (event.type === "checkout.session.completed") {
    console.log("check session complete is called");

    try {
      const session = event.data.object;

      const purchase = await ProjectPurchase.findOne({
        paymentId: session.id,
      }).populate({ path: "projectId" });

      if (!purchase) {
        return res.status(404).json({ message: "Purchase not found" });
      }

      if (session.amount_total) {
        purchase.amount = session.amount_total / 100;
      }
      purchase.status = "completed";

      // Make all lectures visible by setting `isPreviewFree` to true
      if (purchase.projectId && purchase.projectId.lectures.length > 0) {
        await Lecture.updateMany(
          { _id: { $in: purchase.projectId.lectures } },
          { $set: { isPreviewFree: true } }
        );
      }

      await purchase.save();

      // Update user's enrolledprojects
      await User.findByIdAndUpdate(
        purchase.userId,
        { $addToSet: { enrolledProjects: purchase.projectId._id } }, // Add project ID to enrolledprojects
        { new: true }
      );

      // Update Project to add user ID to enrolledStudents
      await Project.findByIdAndUpdate(
        purchase.projectId._id,
        { $addToSet: { enrolledStudents: purchase.userId } }, // Add user ID to enrolledStudents
        { new: true }
      );
    } catch (error) {
      console.error("Error handling event:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  res.status(200).send();
};
export const getProjectDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.id;

    const project = await Project.findById(projectId)
      .populate({ path: "creator" })
      .populate({ path: "lectures" });

    const purchased = await ProjectPurchase.findOne({ userId, projectId });
    console.log(purchased);

    if (!project) {
      return res.status(404).json({ message: "project not found!" });
    }

    return res.status(200).json({
      project,
      purchased: !!purchased, // true if purchased, false otherwise
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllPurchasedProject = async (_, res) => {
  try {
    const purchasedProject = await ProjectPurchase.find({
      status: "completed",
    }).populate("projectId");
    if (!purchasedProject) {
      return res.status(404).json({
        purchasedProject: [],
      });
    }
    return res.status(200).json({
      purchasedProject,
    });
  } catch (error) {
    console.log(error);
  }
};
