import { NextResponse } from 'next/server';
import { products, getProductsByFlavor } from '@/app/lib/products';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

/**
 * GET /api/products
 * Return all products, optionally filtered by flavor
 * Query params: ?flavor=choc|dates
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const flavor = searchParams.get('flavor');

    let result;

    if (flavor) {
      result = getProductsByFlavor(flavor);

      if (!result.length) {
        return NextResponse.json(
          {
            success: true,
            products: [],
            total: 0,
            message: `No products found for flavor "${flavor}"`,
          },
          { status: 200, headers: corsHeaders }
        );
      }
    } else {
      result = products;
    }

    return NextResponse.json(
      { success: true, products: result, total: result.length },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500, headers: corsHeaders }
    );
  }
}

/**
 * POST /api/products
 * Create a new product (admin only)
 */
export async function POST(request) {
  try {
    // TODO: Verify admin authentication
    // const authHeader = request.headers.get('authorization');
    // if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { name, slug, flavor, flavorId, size, protein, calories, price } = body;

    // Validate required fields
    if (!name || !slug || !flavor || !price) {
      return NextResponse.json(
        { success: false, error: 'name, slug, flavor, and price are required' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Check for duplicate slug
    const existingProduct = products.find((p) => p.slug === slug);
    if (existingProduct) {
      return NextResponse.json(
        { success: false, error: `Product with slug "${slug}" already exists` },
        { status: 409, headers: corsHeaders }
      );
    }

    const newProduct = {
      id: slug,
      name,
      slug,
      flavor,
      flavorId: flavorId || flavor.toLowerCase().replace(/\s+/g, '-'),
      size: size || '55g',
      protein: protein || '15g',
      calories: calories || 200,
      price,
      badge: body.badge || null,
      featured: body.featured || false,
      noSugar: body.noSugar || 'No Added Sugar',
      createdAt: new Date().toISOString(),
    };

    // TODO: Save to Firestore
    // await addDoc(collection(db, 'products'), newProduct);

    return NextResponse.json(
      { success: true, product: newProduct },
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500, headers: corsHeaders }
    );
  }
}

/**
 * OPTIONS /api/products
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}
