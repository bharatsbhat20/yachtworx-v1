import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌊 Seeding Yachtworx database...");

  // Clean up
  await prisma.message.deleteMany();
  await prisma.conversationParticipant.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.maintenanceAlert.deleteMany();
  await prisma.requestStatusHistory.deleteMany();
  await prisma.serviceRequest.deleteMany();
  await prisma.document.deleteMany();
  await prisma.componentService.deleteMany();
  await prisma.boatComponent.deleteMany();
  await prisma.boatValueEntry.deleteMany();
  await prisma.boat.deleteMany();
  await prisma.serviceOffering.deleteMany();
  await prisma.certification.deleteMany();
  await prisma.serviceProvider.deleteMany();
  await prisma.user.deleteMany();

  const password = await bcrypt.hash("demo1234", 12);

  // Owner user
  const owner = await prisma.user.create({
    data: {
      email: "owner@demo.com",
      name: "James Harrington",
      passwordHash: password,
      role: "OWNER",
    },
  });

  // Provider user
  const providerUser = await prisma.user.create({
    data: {
      email: "mechanic@demo.com",
      name: "Marcus Reed",
      passwordHash: password,
      role: "PROVIDER",
    },
  });

  // Provider profile
  const provider = await prisma.serviceProvider.create({
    data: {
      userId: providerUser.id,
      businessName: "BlueWater Marine Services",
      description:
        "Expert marine mechanics serving the Miami coastline for 15+ years. Specializing in diesel engines, hull repairs, and complete vessel refits.",
      location: "Miami, FL",
      phone: "+1 (305) 555-0100",
      verified: true,
      rating: 4.9,
      reviewCount: 127,
      certifications: {
        create: [
          { name: "ABYC Marine Technician", issuedBy: "ABYC" },
          { name: "Yamaha Master Technician", issuedBy: "Yamaha Marine" },
          { name: "Volvo Penta Certified", issuedBy: "Volvo Penta" },
        ],
      },
      servicesOffered: {
        create: [
          { category: "ENGINE", name: "Full Engine Service", priceFrom: 500 },
          { category: "ENGINE", name: "Engine Overhaul", priceFrom: 2000 },
          { category: "HULL", name: "Hull Inspection", priceFrom: 200 },
          { category: "HULL", name: "Antifouling Application", priceFrom: 800 },
          { category: "ELECTRICAL", name: "Electrical Diagnostics", priceFrom: 150 },
        ],
      },
    },
  });

  // Second provider
  const provider2User = await prisma.user.create({
    data: {
      email: "provider2@demo.com",
      name: "Sarah Chen",
      passwordHash: password,
      role: "PROVIDER",
    },
  });

  await prisma.serviceProvider.create({
    data: {
      userId: provider2User.id,
      businessName: "Coastal Yacht Care",
      description: "Premium yacht maintenance and detailing. Full-service marina in Fort Lauderdale.",
      location: "Fort Lauderdale, FL",
      verified: true,
      rating: 4.8,
      reviewCount: 89,
      certifications: {
        create: [
          { name: "NMEA 2000 Certified", issuedBy: "NMEA" },
          { name: "Awlgrip Certified Applicator", issuedBy: "Awlgrip" },
        ],
      },
      servicesOffered: {
        create: [
          { category: "DETAILING", name: "Full Detail Package", priceFrom: 350 },
          { category: "ELECTRICAL", name: "Systems Check", priceFrom: 200 },
          { category: "NAVIGATION", name: "Electronics Install", priceFrom: 400 },
        ],
      },
    },
  });

  // Boat 1
  const boat1 = await prisma.boat.create({
    data: {
      ownerId: owner.id,
      name: "Sea Breeze",
      make: "Beneteau",
      model: "Oceanis 51.1",
      year: 2021,
      loa: 15.5,
      beam: 4.7,
      draft: 2.1,
      hullType: "Monohull",
      engineType: "Inboard Diesel",
      registrationNumber: "FL-1234-AB",
      homePort: "Miami Beach Marina",
      purchaseYear: 2021,
      purchasePrice: 420000,
      estimatedValue: 485000,
      imageUrl:
        "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80",
      components: {
        create: [
          {
            category: "ENGINE",
            name: "Yanmar 4JH5E 57HP",
            manufacturer: "Yanmar",
            model: "4JH5E",
            serialNumber: "YM-2021-4567",
            installDate: new Date("2021-03-15"),
            lastService: new Date("2024-11-20"),
            nextService: new Date("2025-11-20"),
            status: "GOOD",
          },
          {
            category: "HULL",
            name: "GRP Monohull",
            manufacturer: "Beneteau",
            installDate: new Date("2021-01-01"),
            lastService: new Date("2024-06-10"),
            nextService: new Date("2025-06-10"),
            status: "GOOD",
          },
          {
            category: "ELECTRICAL",
            name: "4x 100Ah LiFePO4 Battery Bank",
            manufacturer: "Victron Energy",
            installDate: new Date("2022-08-01"),
            lastService: new Date("2024-10-05"),
            nextService: new Date("2025-10-05"),
            status: "GOOD",
          },
          {
            category: "NAVIGATION",
            name: "Garmin GPSMAP 923xsv",
            manufacturer: "Garmin",
            model: "923xsv",
            installDate: new Date("2021-03-15"),
            lastService: new Date("2024-01-15"),
            status: "WARNING",
            notes: "Software update required",
          },
          {
            category: "SAFETY",
            name: "Viking 6-Person Life Raft",
            manufacturer: "Viking",
            installDate: new Date("2021-03-15"),
            lastService: new Date("2022-03-10"),
            nextService: new Date("2025-03-10"),
            status: "CRITICAL",
            notes: "Service interval exceeded — requires immediate inspection",
          },
          {
            category: "INTERIOR",
            name: "Webasto FCF Platinum 16k BTU AC",
            manufacturer: "Webasto",
            installDate: new Date("2021-03-15"),
            lastService: new Date("2024-09-01"),
            nextService: new Date("2025-09-01"),
            status: "GOOD",
          },
        ],
      },
      valueHistory: {
        create: [
          { date: new Date("2021-03-01"), value: 420000, source: "MANUAL" },
          { date: new Date("2022-03-01"), value: 450000, source: "MANUAL" },
          { date: new Date("2023-03-01"), value: 465000, source: "MANUAL" },
          { date: new Date("2024-03-01"), value: 478000, source: "MANUAL" },
          { date: new Date("2025-01-01"), value: 485000, source: "MANUAL" },
        ],
      },
    },
  });

  // Boat 2
  const boat2 = await prisma.boat.create({
    data: {
      ownerId: owner.id,
      name: "Blue Horizon",
      make: "Sunseeker",
      model: "Predator 65",
      year: 2019,
      loa: 19.8,
      beam: 5.3,
      draft: 1.5,
      hullType: "Monohull",
      engineType: "Inboard Diesel",
      registrationNumber: "FL-5678-CD",
      homePort: "Coconut Grove",
      purchaseYear: 2020,
      purchasePrice: 1200000,
      estimatedValue: 1350000,
    },
  });

  // Maintenance alerts
  await prisma.maintenanceAlert.createMany({
    data: [
      {
        userId: owner.id,
        boatId: boat1.id,
        title: "Life Raft Service Overdue",
        description: "Viking life raft last serviced March 2022. Annual service required.",
        dueDate: new Date(Date.now() - 7 * 86400000),
        priority: "CRITICAL",
      },
      {
        userId: owner.id,
        boatId: boat1.id,
        title: "Navigation Software Update",
        description: "Garmin GPSMAP firmware update available v23.0",
        dueDate: new Date(Date.now() + 14 * 86400000),
        priority: "MEDIUM",
      },
      {
        userId: owner.id,
        boatId: boat2.id,
        title: "Annual Engine Service",
        description: "Twin Volvo IPS drives due for annual service (250 hrs since last)",
        dueDate: new Date(Date.now() + 30 * 86400000),
        priority: "HIGH",
      },
    ],
  });

  // Service requests
  const req1 = await prisma.serviceRequest.create({
    data: {
      ownerId: owner.id,
      boatId: boat1.id,
      providerId: provider.id,
      title: "Annual Engine Service",
      description:
        "Full Yanmar 4JH5E service including oil change, fuel filters, raw water impeller, zincs, and heat exchanger flush.",
      category: "ENGINE",
      status: "IN_PROGRESS",
      urgency: "NORMAL",
      quotedPrice: 1200,
    },
  });

  await prisma.requestStatusHistory.createMany({
    data: [
      { requestId: req1.id, status: "PENDING", note: "Request submitted by owner", createdAt: new Date(Date.now() - 7 * 86400000) },
      { requestId: req1.id, status: "QUOTED", note: "Quote: $1,200 (parts + labor)", createdAt: new Date(Date.now() - 5 * 86400000) },
      { requestId: req1.id, status: "ACCEPTED", note: "Owner accepted quote", createdAt: new Date(Date.now() - 4 * 86400000) },
      { requestId: req1.id, status: "IN_PROGRESS", note: "Work commenced at marina", createdAt: new Date(Date.now() - 2 * 86400000) },
    ],
  });

  const req2 = await prisma.serviceRequest.create({
    data: {
      ownerId: owner.id,
      boatId: boat1.id,
      title: "Hull Antifouling Paint",
      description: "Haul out, strip old ablative paint, apply 3 coats Interlux Micron Extra antifouling.",
      category: "PAINTING",
      status: "PENDING",
      urgency: "NORMAL",
    },
  });

  await prisma.requestStatusHistory.create({
    data: { requestId: req2.id, status: "PENDING", note: "Request submitted", createdAt: new Date(Date.now() - 86400000) },
  });

  // Documents
  await prisma.document.createMany({
    data: [
      {
        ownerId: owner.id,
        boatId: boat1.id,
        type: "REGISTRATION",
        name: "Sea Breeze - USCG Documentation",
        fileUrl: "/uploads/documents/registration.pdf",
        fileSize: 1248000,
        mimeType: "application/pdf",
        expiresAt: new Date(Date.now() + 200 * 86400000),
      },
      {
        ownerId: owner.id,
        boatId: boat1.id,
        type: "INSURANCE",
        name: "Progressive Marine Insurance 2025",
        fileUrl: "/uploads/documents/insurance.pdf",
        fileSize: 2560000,
        mimeType: "application/pdf",
        expiresAt: new Date(Date.now() + 25 * 86400000),
      },
      {
        ownerId: owner.id,
        boatId: boat1.id,
        type: "SURVEY",
        name: "Pre-Purchase Survey 2021",
        fileUrl: "/uploads/documents/survey.pdf",
        fileSize: 4200000,
        mimeType: "application/pdf",
      },
      {
        ownerId: owner.id,
        boatId: boat1.id,
        type: "CERTIFICATE",
        name: "Fire Extinguisher Cert - Expires Feb 2025",
        fileUrl: "/uploads/documents/fire-cert.pdf",
        fileSize: 340000,
        mimeType: "application/pdf",
        expiresAt: new Date(Date.now() - 5 * 86400000),
      },
    ],
  });

  // Conversations
  const conv = await prisma.conversation.create({
    data: {
      subject: "Annual Engine Service - Sea Breeze",
      participants: {
        create: [
          { userId: owner.id, unreadCount: 2 },
          { userId: providerUser.id, unreadCount: 0 },
        ],
      },
    },
  });

  await prisma.message.createMany({
    data: [
      {
        conversationId: conv.id,
        senderId: owner.id,
        body: "Hi Marcus, just confirming you received the service request for Sea Breeze. Looking forward to getting this sorted.",
        createdAt: new Date(Date.now() - 3 * 86400000),
      },
      {
        conversationId: conv.id,
        senderId: providerUser.id,
        body: "Hi James! Yes I received it. I've reviewed the specs and have all the parts ready. I can start Thursday morning.",
        createdAt: new Date(Date.now() - 2 * 86400000 - 3600000),
      },
      {
        conversationId: conv.id,
        senderId: providerUser.id,
        body: "Update: We've completed the oil change and filter replacement. The impeller looked good but I found a small pinhole in one of the hose clamps — replaced it at no extra charge.",
        createdAt: new Date(Date.now() - 2 * 3600000),
      },
    ],
  });

  console.log("✅ Seed completed!");
  console.log("\n📧 Demo accounts:");
  console.log("  Owner: owner@demo.com / demo1234");
  console.log("  Mechanic: mechanic@demo.com / demo1234");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
