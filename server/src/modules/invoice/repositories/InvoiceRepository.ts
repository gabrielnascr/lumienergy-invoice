import { Invoice, Prisma } from "@prisma/client";
import { PrismaService } from "../../../core/PrismaService";

export interface IInvoiceRepository {
  createInvoice(data: Prisma.InvoiceCreateInput): Promise<Invoice>;
  findInvoiceByCustomerNameAndReferenceMonth(
    customeNumber: string,
    referenceMonth: string
  ): Promise<Invoice[]>;
  getInvoiceById(id: string): Promise<Invoice | null>;
  updateInvoice(
    id: string,
    data: Prisma.InvoiceUpdateInput
  ): Promise<Invoice | null>;
  deleteInvoice(id: string): Promise<void>;
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

  async findInvoiceByCustomerNameAndReferenceMonth(
    customeNumber: string,
    referenceMonth: string
  ): Promise<Invoice | null> {
    return this.prisma.getPrisma().invoice.findMany({
      where: {
        customeNumber,
        referenceMonth,
      },
    });
  }

  async getInvoiceById(id: string): Promise<Invoice | null> {
    return this.prisma.getPrisma().invoice.findUnique({
      where: { id },
    });
  }

  async updateInvoice(
    id: string,
    data: Prisma.InvoiceUpdateInput
  ): Promise<Invoice | null> {
    return this.prisma.getPrisma().invoice.update({
      where: { id },
      data,
    });
  }

  async deleteInvoice(id: string) {
    try {
      await this.prisma.getPrisma().invoiceCost.deleteMany({
        where: {
          invoiceId: id,
        },
      });
      await this.prisma.getPrisma().invoice.delete({
        where: { id },
      });
      await this.prisma.getPrisma().address.deleteMany({
        where: {
          invoice: {
            id,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllInvoices(): Promise<Invoice[]> {
    return this.prisma.getPrisma().invoice.findMany();
  }
}
