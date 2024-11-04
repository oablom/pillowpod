import prisma from "@/app/libs/prismadb";
import { ObjectId } from "mongodb";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    const { listingId, userId, authorId } = params;
    console.log("Listing ID i getReservations:", listingId);
    console.log("Listing ID:", listingId, "Type:", typeof listingId);

    const query: any = {};

    // Konvertera listingId till ObjectId om det är giltigt
    if (listingId) {
      query.listingId = new ObjectId(listingId); // Omvandlar listingId till ObjectId
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

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
      listing: reservation.listing
        ? {
            ...reservation.listing,
            createdAt: reservation.listing.createdAt.toISOString(),
          }
        : null,
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
