import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProductService } from './product.service';
import { ProductDTO } from './product.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createProduct(@Body() productDTO: ProductDTO) {
    const product = await this.productService.create(productDTO);
    return product;
  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  async getAllProducts() {
    const products = await this.productService.getAll();
    return products;
  }

  @Get('id/:id')
  @UseGuards(JwtAuthGuard)
  async getCarByProduct(@Param('id') id: string) {
    const product = await this.productService.findById(id);
    return product;
  }

  @Get('my-products')
  @UseGuards(JwtAuthGuard)
  async getMyCars(@Req() req) {
    const userEmail = req.user.email;
    const products = await this.productService.getMyProducts(userEmail);
    return products;
  }

  @Put('update/:id')
  @UseGuards(JwtAuthGuard)
  async updateProduct(@Param('id') id: string, @Body() productDTO: ProductDTO) {
    const updatedProduct = await this.productService.update(id, productDTO);
    return updatedProduct;
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  async deleteProduct(@Param('id') id: string) {
    await this.productService.delete(id);
    return { message: 'Product deleted successfully' };
  }
}
