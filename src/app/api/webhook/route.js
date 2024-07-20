import { NextResponse } from "next/server";
import { headers } from "next/headers";
import formsg from "@opengovsg/formsg-sdk";

const formsgInstance = formsg();
const POST_URI = "https://issue-tracker-gules-delta.vercel.app/api/webhook"
const formSecretKey = process.env.FORMSG_API_KEY


export async function POST(request) {
    try {
        const signature = headers().get("X-Formsg-Signature");
        formsgInstance.webhooks.authenticate(signature, POST_URI)
    } catch (e) {
        console.log("Invalid signature")
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    try {
        const data = await request.json();
        const { attachmentDownloadUrls } = data;
        const hasAttachment = attachmentDownloadUrls && attachmentDownloadUrls.length > 0;
        const submission = hasAttachment
            ? await formsgInstance.crypto.decryptWithAttachments(formSecretKey, body.data)
            : await formsgInstance.crypto.decrypt(formSecretKey, body.data)

        console.log(submission)

        return NextResponse.json({ message: "Received Response" }, { status: 200 });

    } catch (e) {
        console.log("Unable to decrypt")
        return NextResponse.json({ error: "Unable to decrypt" }, { status: 401 });
    }
}
