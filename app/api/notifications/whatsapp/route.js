import { NextResponse } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// FuelBar WhatsApp number (without + prefix for wa.me link)
const WHATSAPP_NUMBER = '916263099627';

/**
 * POST /api/notifications/whatsapp
 * Generate WhatsApp notification for a new order
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { orderId, customerName, items, total, phone, address } = body;

    if (!orderId || !customerName || !items || !total) {
      return NextResponse.json(
        { success: false, error: 'orderId, customerName, items, and total are required' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Build order items summary
    const itemsList = items
      .map(
        (item) =>
          `• ${item.name} (${item.flavor || ''} ${item.size || ''}) x${item.quantity} — ₹${item.price * item.quantity}`
      )
      .join('\n');

    // Construct the WhatsApp message
    const message = [
      `🔥 *New FuelBar Order!*`,
      ``,
      `*Order ID:* ${orderId}`,
      `*Customer:* ${customerName}`,
      `*Phone:* ${phone || 'N/A'}`,
      `*Address:* ${address || 'N/A'}`,
      ``,
      `*Items:*`,
      itemsList,
      ``,
      `*Total:* ₹${total}`,
      ``,
      `---`,
      `Sent from FuelBar Website 🍫`,
    ].join('\n');

    // Encode for URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // In production, integrate with WhatsApp Business API:
    //
    // const WHATSAPP_API_URL = `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
    //
    // const response = await fetch(WHATSAPP_API_URL, {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     messaging_product: 'whatsapp',
    //     to: phone,
    //     type: 'template',
    //     template: {
    //       name: 'order_confirmation',
    //       language: { code: 'en' },
    //       components: [
    //         {
    //           type: 'body',
    //           parameters: [
    //             { type: 'text', text: customerName },
    //             { type: 'text', text: orderId },
    //             { type: 'text', text: `₹${total}` },
    //           ],
    //         },
    //       ],
    //     },
    //   }),
    // });
    //
    // const result = await response.json();
    // return NextResponse.json({ success: true, messageId: result.messages[0].id });

    return NextResponse.json(
      {
        success: true,
        whatsappUrl,
        message: 'WhatsApp notification URL generated',
        preview: message,
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error generating WhatsApp notification:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate WhatsApp notification' },
      { status: 500, headers: corsHeaders }
    );
  }
}

/**
 * OPTIONS /api/notifications/whatsapp
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}
