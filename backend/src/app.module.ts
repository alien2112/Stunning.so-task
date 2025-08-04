import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebsiteIdeaModule } from './modules/website-idea.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb+srv://eslamabdaltif:viQL8uOaQ1ZXuSe8@cluster0.ivz0ejd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    ),
    WebsiteIdeaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
