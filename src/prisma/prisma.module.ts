import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// her serviste/modul'de DB Connection gerekiyor bunu her modulde import etmemize gerek yok.
@Global() // @Global() ile hepsini entegre edebiliriz
@Module({
  providers: [PrismaService],
  // INFO: bunu export etmeden diğer moduller'de kullanmaya çalışırsak hata alırız
  exports: [PrismaService],
})
export class PrismaModule {}
