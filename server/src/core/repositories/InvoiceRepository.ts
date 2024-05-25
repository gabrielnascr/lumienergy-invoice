import { Invoice, Prisma } from "@prisma/client";
import { PrismaService } from "../PrismaService";

export interface IInvoiceRepository {
  createInvoice(data: Prisma.InvoiceCreateInput): Promise<Invoice>;
  getInvoiceById(id: number): Promise<Invoice | null>;
  updateInvoice(
    id: number,
    data: Prisma.InvoiceUpdateInput
  ): Promise<Invoice | null>;
  deleteInvoice(id: number): Promise<Invoice | null>;
  getAllInvoices(): Promise<Invoice[]>;
}

export class InvoiceRepository implements IInvoiceRepository {
  private prisma: PrismaService;

  constructor() {
    this.prisma = new PrismaService();
  }

  async createInvoice(data: Prisma.InvoiceCreateInput): Promise<Invoice> {
    return this.prisma.getPrisma().invoice.create({ data });
  }

  async getInvoiceById(id: number): Promise<Invoice | null> {
    return this.prisma.getPrisma().invoice.findUnique({
      where: { id },
    });
  }

  async updateInvoice(
    id: number,
    data: Prisma.InvoiceUpdateInput
  ): Promise<Invoice | null> {
    return this.prisma.getPrisma().invoice.update({
      where: { id },
      data,
    });
  }

  async deleteInvoice(id: number): Promise<Invoice | null> {
    return this.prisma.getPrisma().invoice.delete({
      where: { id },
    });
  }

  async getAllInvoices(): Promise<Invoice[]> {
    return this.prisma.getPrisma().invoice.findMany();
  }
}
