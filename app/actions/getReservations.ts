import prisma from "@/app/libs/prismadb";
import { ObjectId } from "mongodb";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    const { userId, authorId } = params;
    let listingId = params.listingId;

    if (listingId && ObjectId.isValid(listingId)) {
      listingId = new ObjectId(listingId) as any;
    } else if (listingId) {
      console.error("Invalid listingId format for ObjectId");
      return [];
    }

    const query: any = { listingId, userId, authorId };

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error: any) {
    console.error("Error in getReservations:", error);
    return [];
  }
}
