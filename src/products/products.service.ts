import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async createProduct(data: { sku: string; name: string; brand: string; costPrice: number; salePrice: number }) {
    const existing = await this.prisma.product.findUnique({ where: { sku: data.sku } });
    if (existing) {
      throw new BadRequestException(`El SKU ${data.sku} ya está registrado.`);
    }

    return await this.prisma.product.create({
      data: {
        sku: data.sku,
        name: data.name,
        brand: data.brand,
        costPrice: data.costPrice,
        salePrice: data.salePrice,
        inventory: {
          create: { quantity: 0, reserved: 0 },
        },
      },
      include: { inventory: true },
    });
  }

  async findAll() {
    return await this.prisma.product.findMany({
      include: { inventory: true },
    });
  }
}