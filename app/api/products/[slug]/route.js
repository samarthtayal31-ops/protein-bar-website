import { NextResponse } from 'next/server';
import { products, getProductBySlug } from '@/app/lib/products';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

/**
 * GET /api/products/[slug]
 * Get a single product by slug
 */
export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const product = getProductBySlug(slug);

    if (!product) {
      return NextResponse.json(
        { success: false, error: `Product with slug "${slug}" not found` },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { success: true, product },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500, headers: corsHeaders }
    );
  }
}

/**
 * PUT /api/products/[slug]
 * Update a product (admin only)
 */
export async function PUT(request, { params }) {
  try {
    // TODO: Verify admin authentication
    const { slug } = await params;
    const body = await request.json();

    const product = getProductBySlug(slug);

    if (!product) {
      return NextResponse.json(
        { success: false, error: `Product with slug "${slug}" not found` },
        { status: 404, headers: corsHeaders }
      );
    }

    // Merge updates with existing product
    const updatedProduct = {
      ...product,
      ...body,
      slug, // Prevent slug from being overwritten
      updatedAt: new Date().toISOString(),
    };

    // TODO: Update in Firestore
    // await updateDoc(doc(db, 'products', product.id), updatedProduct);

    return NextResponse.json(
      { success: true, product: updatedProduct },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update product' },
      { status: 500, headers: corsHeaders }
    );
  }
}

/**
 * DELETE /api/products/[slug]
 * Delete a product (admin only)
 */
export async function DELETE(request, { params }) {
  try {
    // TODO: Verify admin authentication
    const { slug } = await params;
    const product = getProductBySlug(slug);

    if (!product) {
      return NextResponse.json(
        { success: false, error: `Product with slug "${slug}" not found` },
        { status: 404, headers: corsHeaders }
      );
    }

    // TODO: Delete from Firestore
    // await deleteDoc(doc(db, 'products', product.id));

    return NextResponse.json(
      { success: true, message: `Product "${product.name}" deleted`, slug },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete product' },
      { status: 500, headers: corsHeaders }
    );
  }
}

/**
 * OPTIONS /api/products/[slug]
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}
