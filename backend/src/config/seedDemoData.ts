import bcrypt from "bcryptjs";
import { Lead } from "../models/Lead";
import { User } from "../models/User";
import type { LeadSource, LeadStatus } from "../types";

const SALES_EMAIL = "sales@gigflow.com";
const SALES_PASSWORD = "Sales@123456";

interface SeedLead {
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  daysAgo: number;
}

const DEMO_LEADS: SeedLead[] = [
  { name: "Rahul Sharma", email: "rahul.sharma@example.com", status: "Qualified", source: "Instagram", daysAgo: 1 },
  { name: "Priya Patel", email: "priya.patel@acme.io", status: "New", source: "Website", daysAgo: 0 },
  { name: "Arjun Mehta", email: "arjun@startup.co", status: "Contacted", source: "Referral", daysAgo: 2 },
  { name: "Sneha Reddy", email: "sneha.reddy@mail.com", status: "Qualified", source: "Website", daysAgo: 3 },
  { name: "Vikram Singh", email: "vikram.singh@corp.in", status: "Lost", source: "Instagram", daysAgo: 5 },
  { name: "Ananya Iyer", email: "ananya.iyer@design.studio", status: "New", source: "Instagram", daysAgo: 0 },
  { name: "Karan Malhotra", email: "karan.m@fintech.com", status: "Contacted", source: "Website", daysAgo: 4 },
  { name: "Divya Nair", email: "divya.nair@agency.com", status: "Qualified", source: "Referral", daysAgo: 6 },
  { name: "Rohan Gupta", email: "rohan.gupta@saas.io", status: "New", source: "Referral", daysAgo: 1 },
  { name: "Meera Joshi", email: "meera.j@healthplus.in", status: "Contacted", source: "Instagram", daysAgo: 7 },
  { name: "Aditya Rao", email: "aditya.rao@edu.org", status: "Lost", source: "Website", daysAgo: 9 },
  { name: "Isha Khanna", email: "isha.khanna@retail.com", status: "Qualified", source: "Instagram", daysAgo: 2 },
  { name: "Nikhil Verma", email: "nikhil.v@logistics.co", status: "New", source: "Website", daysAgo: 3 },
  { name: "Pooja Desai", email: "pooja.desai@consulting.biz", status: "Contacted", source: "Referral", daysAgo: 8 },
  { name: "Amit Choudhary", email: "amit.c@manufacturing.in", status: "Qualified", source: "Website", daysAgo: 10 },
  { name: "Kavya Menon", email: "kavya.m@media.net", status: "New", source: "Instagram", daysAgo: 4 },
  { name: "Suresh Pillai", email: "suresh.p@enterprise.com", status: "Lost", source: "Referral", daysAgo: 12 },
  { name: "Tanvi Agarwal", email: "tanvi.a@ecommerce.shop", status: "Contacted", source: "Website", daysAgo: 5 },
];

function daysAgoDate(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(10 + (days % 8), 30, 0, 0);
  return d;
}

export async function seedDemoData(): Promise<void> {
  let salesUser = await User.findOne({ email: SALES_EMAIL });
  if (!salesUser) {
    const hashed = await bcrypt.hash(SALES_PASSWORD, 12);
    salesUser = await User.create({
      name: "Alex Sales",
      email: SALES_EMAIL,
      password: hashed,
      role: "sales",
    });
    console.log(`Seeded sales user: ${SALES_EMAIL}`);
  }

  const adminUser = await User.findOne({ role: "admin" });
  const createdBy = salesUser._id;

  const leadCount = await Lead.countDocuments();
  if (leadCount > 0) {
    console.log(`Skipping demo leads (${leadCount} already exist)`);
    return;
  }

  const owner = adminUser?._id ?? createdBy;

  await Lead.insertMany(
    DEMO_LEADS.map((lead) => ({
      name: lead.name,
      email: lead.email,
      status: lead.status,
      source: lead.source,
      createdBy: lead.email.includes("rahul") ? owner : createdBy,
      createdAt: daysAgoDate(lead.daysAgo),
      updatedAt: daysAgoDate(lead.daysAgo),
    }))
  );

  console.log(`Seeded ${DEMO_LEADS.length} demo leads`);
}
