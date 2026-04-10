"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";
import { writeFile } from "fs/promises";

export async function fetchProjects() {
  console.log("FETCH_PROJECTS: START");
  if (!db) {
    console.error("FETCH_PROJECTS: db is undefined!");
    return [];
  }
  try {
    const properties = await db.property.findMany({
      orderBy: { createdAt: "desc" },
    });
    
    // Map Prisma models to the UI ProjectCard shape
    return properties.map((property) => ({
      id: property.id,
      name: property.name,
      location: property.location,
      inquiries: property.inquiries?.length || 0,
      imageUrl: property.imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuB1OcRfucn2zA9U8jqahihXviks4q7YX1Ova2bCyNhvOiJxYSt1nv5-vZxNoPHfPflL7N9lcNZyWe3UG0lcLlGs9IWti2jfVl_pwLhUMv9a3LNCaWcOSj9ZxGZT9Ppkjg_5NMRQSSrS_r78m5VPRjlci0EU78oLAsCXXfpNnt8dA741tOn7OIBQ5VuPFuUjqpQXu1HSJTfWuqoV2pFBwvdZytpU9Yl1LwAcZPyDZd-1HGjoUGuWrbvEcS05gHXix7rIwFyOPsBWG60", 
      imageAlt: property.imageAlt || "Project Property Image",
      images: property.images || [],
      size: "portrait", 
      salesExecs: 0,
      category: property.city.toLowerCase().replace(/ /g, "-"),
      // Extension details
      houseModel: property.houseModel || "Not specified",
      houseType: property.type || "Not specified",
      constructionStatus: property.constructionStatus || "Not specified",
      developer: property.developer || "Not specified",
      exactLocation: property.exactLocation || property.location,
      commission: property.commissionRate || "Standard",
      priority: property.priority || "Normal",
      priceRange: property.priceRange || "Contact for details",
      tcp: property.tcp ? "₱" + Number(property.tcp).toLocaleString() : "N/A",
      reservationFee: property.reservationFee ? "₱" + Number(property.reservationFee).toLocaleString() : "N/A",
      requiredSalary: property.requiredSalary ? "₱" + Number(property.requiredSalary).toLocaleString() : "N/A",
      dpOption: property.dpOption || "N/A",
      driveLink: property.driveLink || "",
    }));
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function createProjectAction(formData: FormData) {
  console.log("CREATE_PROJECT_ACTION: START");
  try {
    const rawData = Object.fromEntries(formData.entries());
    console.log("CREATE_PROJECT_ACTION: RAW_DATA (summary)", { name: rawData.name });
    
    const savedImageUrls: string[] = [];
    // Handle multiple files named "imageFiles"
    const files = formData.getAll("imageFiles") as File[];
    console.log(`CREATE_PROJECT_ACTION: PROCESSING ${files.length} FILES`);

    const publicPath = path.join(process.cwd(), "public", "uploads");
    try {
      await fs.access(publicPath);
    } catch {
      await fs.mkdir(publicPath, { recursive: true });
    }

    for (const file of files) {
      if (file && file.name && file.name !== "undefined" && file.size > 0) {
        console.log("CREATE_PROJECT_ACTION: SAVING_FILE", file.name);
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = `${Date.now()}_${Math.floor(Math.random() * 1000)}_${file.name.replace(/\s+/g, "_")}`;
        const filePath = path.join(publicPath, filename);
        await writeFile(filePath, buffer);
        savedImageUrls.push(`/uploads/${filename}`);
      }
    }

    const mainImageUrl = savedImageUrls.length > 0 ? savedImageUrls[0] : (formData.get("imageUrl") as string || undefined);

    console.log("CREATE_PROJECT_ACTION: CALLING_PRISMA");
    
    const newProperty = await db.property.create({
      data: {
        name: (formData.get("name") as string) || "Unnamed Project",
        location: (formData.get("location") as string) || "Unknown Location",
        city: (formData.get("city") as string) || "Dasmariñas",
        province: (formData.get("province") as string) || "Cavite",
        developer: formData.get("developer") as string,
        exactLocation: formData.get("exactLocation") as string,
        houseModel: formData.get("houseModel") as string,
        constructionStatus: (formData.get("constructionStatus") as string) || "Preselling",
        priority: (formData.get("priority") as string) || "Standard",
        commissionRate: (formData.get("commissionRate") as string) || "5.00% COMM",
        priceRange: formData.get("priceRange") as string,
        tcp: formData.get("tcp") ? Number(formData.get("tcp")) : undefined,
        reservationFee: formData.get("reservationFee") ? Number(formData.get("reservationFee")) : undefined,
        requiredSalary: formData.get("requiredSalary") ? Number(formData.get("requiredSalary")) : undefined,
        dpOption: formData.get("dpOption") as string,
        driveLink: formData.get("driveLink") as string,
        price: formData.get("tcp") ? Number(formData.get("tcp")) : 0, 
        imageUrl: mainImageUrl,
        images: savedImageUrls,
        imageAlt: (formData.get("name") as string) || "Project Image",
        type: (formData.get("type") as any) || "HOUSE_AND_LOT",
      },
    });

    console.log("CREATE_PROJECT_ACTION: SUCCESS", newProperty.id);
    revalidatePath("/projects");
    return { success: true, project: { id: newProperty.id, name: newProperty.name } };
  } catch (error: any) {
    console.error("CREATE_PROJECT_ACTION: ERROR", error);
    return { success: false, error: error.message || "Failed to create project" };
  }
}
