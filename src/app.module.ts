import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { PublisherModule } from './publisher/publisher.module';
import { AuthorModule } from './author/author.module';
import { TranslatorModule } from './translator/translator.module';
import { BookModule } from './book/book.module';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule, 
    AuthModule, 
    PrismaModule, 
    CategoryModule, 
    PublisherModule, 
    AuthorModule, 
    TranslatorModule,
     BookModule,
     CoreModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
