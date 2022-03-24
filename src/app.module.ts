import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PoductModule } from './Product/Product.module';

@Module({
  imports: [PoductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
