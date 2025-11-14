import { NextResponse } from "next/server";
import Mustache from "mustache";

function buildRenderCtxFromUser(user: any) {
  return {
    user: {
      firstName: user.firstName, lastName: user.lastName,
      fullName: `${user.firstName} ${user.lastName}`,
      email: user.email, address: user.address, phone: user.phone,
      dni: user.dni, postalCode: user.postalCode, city: user.city, country: user.country,
      coursePriceCents: user.coursePriceCents,
    },
    price: { euros: (user.coursePriceCents / 100).toFixed(2) },
    todayISO: new Date().toISOString().split("T")[0],
  };
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = Number(url.searchParams.get("userId") ?? "1");
  if (!userId) return NextResponse.json({ error: "userId inválido" }, { status: 400 });

  const contracts = await prisma.contract.findMany({
    where: { userId },
    include: { template: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(contracts);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userId = Number(body.userId);
    const templateKey: string = body.templateKey;
    if (!userId || !templateKey) {
      return NextResponse.json({ error: "userId y templateKey requeridos" }, { status: 400 });
    }

    const [user, tpl] = await Promise.all([
      prisma.user.findUnique({ where: { id: userId } }),
      prisma.contractTemplate.findUnique({ where: { key: templateKey } }),
    ]);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    if (!tpl) return NextResponse.json({ error: "Template not found" }, { status: 404 });

    const htmlSnapshot = Mustache.render(tpl.html, buildRenderCtxFromUser(user));

    const contract = await prisma.contract.create({
      data: { userId, templateId: tpl.id, htmlSnapshot, status: "pending" },
    });
    return NextResponse.json(contract, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? "Internal error" }, { status: 500 });
  }
}
