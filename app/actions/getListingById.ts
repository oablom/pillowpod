import prisma from "@/app/libs/prismadb";
import { ObjectId } from "mongodb"; // Importera ObjectId

interface IParams {
  listingId?: string;
}

export async function getListingById(params: IParams) {
  try {
    const { listingId } = params;

    // Kontrollera och konvertera listingId till ObjectId om det är giltigt
    if (!listingId || !ObjectId.isValid(listingId)) {
      console.error("Invalid listingId format");
      return null;
    }

    const objectId = new ObjectId(listingId); // Skapa en ObjectId från listingId

    const listing = await prisma.listing.findUnique({
      where: {
        id: objectId as any, // Använd objectId och kringgå TypeScript-fel
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toISOString() || null,
      },
    };
  } catch (error: any) {
    console.error("Error in getListingById:", error);
    return null;
  }
}
