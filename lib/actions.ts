"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

// Helper to save files locally in /public/uploads
async function uploadFilesLocally(formData: FormData, fieldName: string): Promise<string> {
  const files = formData.getAll(fieldName) as File[];
  if (files.length === 0 || files[0].size === 0) return "";

  const uploadDir = path.join(process.cwd(), "public/uploads");
  
  // Ensure dir exists
  try {
    await mkdir(uploadDir, { recursive: true });
  } catch (e) {}

  const urls: string[] = [];

  for (const file of files) {
    if (file.size === 0) continue;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Create unique filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniqueSuffix}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const filepath = path.join(uploadDir, filename);
    
    await writeFile(filepath, buffer);
    urls.push(`/uploads/${filename}`);
  }

  return urls.join(","); // Comma separated URLs
}

// --- PRODUCTS (CATALOG) ---

export async function getProducts() {
  return await prisma.product.findMany({
    orderBy: { createdAt: "desc" }
  });
}

export async function getProductById(id: string) {
  return await prisma.product.findUnique({
    where: { id }
  });
}

export async function createProduct(formData: FormData) {
  const model = formData.get("model") as string;
  const capacity = formData.get("capacity") as string;
  const color = formData.get("color") as string;
  const battery = formData.get("battery") as string;
  const condition = formData.get("condition") as string;
  const price = parseFloat(formData.get("price") as string);
  
  const images = await uploadFilesLocally(formData, "files");
  
  await prisma.product.create({
    data: {
      model,
      capacity,
      color,
      battery,
      condition,
      price,
      images,
      status: "AVAILABLE",
    }
  });
  
  revalidatePath("/catalogo");
  revalidatePath("/admin/productos");
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
  revalidatePath("/catalogo");
  revalidatePath("/admin/productos");
}

export async function updateProductStatus(id: string, status: string) {
  await prisma.product.update({
    where: { id },
    data: { status }
  });
  revalidatePath("/catalogo");
  revalidatePath("/admin/productos");
}

// --- LEADS (OFFERS) ---

export async function getLeads() {
  return await prisma.lead.findMany({
    orderBy: { createdAt: "desc" }
  });
}

export async function updateLeadStatus(id: string, status: string) {
  await prisma.lead.update({
    where: { id },
    data: { status }
  });
  revalidatePath("/admin/leads");
}

export async function createLead(formData: FormData) {
  const model = formData.get("model") as string || "No especificado";
  const capacity = formData.get("capacity") as string || "-";
  const battery = formData.get("battery") as string || "-";
  const targetPriceStr = formData.get("targetPrice") as string;
  const targetPrice = targetPriceStr ? parseFloat(targetPriceStr) : 0;
  
  const contactName = formData.get("contactName") as string;
  const contactEmail = formData.get("contactEmail") as string;
  const phone = formData.get("phone") as string;
  const city = formData.get("city") as string;
  
  const images = await uploadFilesLocally(formData, "files");

  const fullContact = [contactName, contactEmail, phone, city].filter(Boolean).join(" - ");
  
  await prisma.lead.create({
    data: {
      model,
      capacity,
      battery,
      condition: "Por revisar",
      targetPrice,
      images,
      contact: fullContact,
      status: "NEW",
    }
  });
  
  // Here we would send an email with Resend/Nodemailer
  
  revalidatePath("/admin/leads");
}
