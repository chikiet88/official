import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
  Req,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { google, drive_v3, Auth, Common } from 'googleapis';
import fs = require('fs');
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import sharp from 'sharp';
import { UpserveService } from './upserve.service';
// import { MediaService } from './media.service';
const auth: Auth.GoogleAuth = new google.auth.GoogleAuth({
  keyFile: './keydriveapi.json',
  scopes: ['https://www.googleapis.com/auth/drive'],
});
const drive: drive_v3.Drive = google.drive({
  version: 'v3',
  auth,
});
export const editFileName = (req: any, file: any, callback: any) => {
  file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
  const filename = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = new Date().getTime();
  callback(null, `${filename}_${randomName}${fileExtName}`);
};
export const DeleteFile = (path: any) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
    return true;
  } else {
    console.error(false);
    return false;
  }
};
@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly _UpserveService: UpserveService,
    // private readonly mediaService: MediaService
  ) { }

@Post('server')
    @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          // const path = './dist/' + req.query.folder;
          const path = '/home/tazaspac/images/' + req.query.folder;
          if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
            console.log('Folder created:', path);
          } else {
            console.log('Folder already exists:', path);
          }
          // const path = './dist/' + req.query.folder+'/assets';
          cb(null, path);
        },
        filename: editFileName,
      }),
    }),
  )
  async server(@UploadedFile() file) { 
      return await this.uploadService.upload(file);
  }
@Post('local')
    @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          // const path = './dist/' + req.query.folder;
          const path = '/home/tazaspac/images/' + req.query.folder;
          if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
            console.log('Folder created:', path);
          } else {
            console.log('Folder already exists:', path);
          }
          // const path = './dist/' + req.query.folder+'/assets';
          cb(null, path);
        },
        filename: editFileName,
      }),
    }),
  )
  async serverlocal(@UploadedFile() file) { 
    const originalPath = file.path;
    // Create a directory to save resized copies
    //const resizedDirectory = './uploads/resized/';

    if (!fs.existsSync(originalPath)) {
      fs.mkdirSync(originalPath, { recursive: true });
    }
    await sharp(originalPath)
      .webp({ quality: 90 }) // Adjust quality as needed (0-100)
      .toFile(`${originalPath.replace(extname(originalPath), '.webp')}`);
    return await this.uploadService.uploadlocal(file);
  }
  @Post('cloud')
  // @UseInterceptors(FileInterceptor('file'))
  async cloud(@Body() file: any) {
    return this.uploadService.createFileDrive(file);
  }
  @Post('/createfiledrive')
  // @UseInterceptors(FileInterceptor('file'))
  async createFileDrive(@Body() file: any) {
    return this.uploadService.createFileDrive(file);
  }
  @Post('/listfile')
  async listfile(@Body() data: any) {
    const driveId = data.driveId || '0AKQL50NKsue5Uk9PVA'  
    const query = data.query|| '"1AWsiA4g7sSxEfgy3udIrRuUb0nS3JS-h" in parents'
    const pageSize = data.pageSize|| 1000
    const mimeType = data.mimeType|| 'image/jpeg'
    const folder = await drive.files.list({
      corpora: 'drive',
      driveId: driveId,
      includeItemsFromAllDrives: true,
      q: query,
      pageSize: pageSize,
      supportsAllDrives: true,
      fields: 'files(id,name,createdTime,modifiedTime,size,mimeType)',
    });   
    let files = folder.data.files; 
    files = files.filter((v: any) => {
      return v.mimeType == 'image/jpeg'
    });
    return files;
  }
  async downloadFile(fileId: string, destinationPath: string) {
    const { data } = await drive.files.get(
      { fileId, alt: 'media' },
      { responseType: 'stream' }
    );
    const dest = fs.createWriteStream(destinationPath);
    data.pipe(dest);
    return new Promise<void>((resolve, reject) => {
      dest.on('finish', () => resolve());
      dest.on('error', (err) => reject(err));
    });
  }
  async getFile(fileId: string) {
    // const response = await drive.files.get({
    //   fileId: fileId,
    //   fields: 'id,name,mimeType',
    // });
    // return response.data
    try {
      const response = await drive.files.get({
        fileId: fileId,
        fields: 'id, name, mimeType',
      });
  
      const file = response.data;
      console.log('File ID:', file.id);
      console.log('File Name:', file.name);
      console.log('MIME Type:', file.mimeType); 
      return file;
    } catch (error) {
      console.error('Error retrieving file:', error.message);
      throw error;
    }
  }
  @Post('/dongbo')
  async dongbo(@Body() data: any) {   
    const path = './upload/';
    data.forEach(async (v:any) => {
       try {
        console.error(v);
        await this.downloadFile(v.idDrive, path+v.name);
        } catch (error) {
      }
    });
    return(data)


    // let files = folder.data.files; 
    // files = files.filter((v: any) => {
    //   return v.mimeType == 'image/jpeg'||v.mimeType == 'image/png'
    // });
    // const destinationPath = './upload/hinh_hderma/';
    // files.forEach(async v => {
    //   try {
    //     console.error(v);
    //     await this.downloadFile(v.id, destinationPath+v.name);
    //   } catch (error) {
    //   }
    // })
    // return files;
  }

  @Post('/file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload',
        filename: editFileName
      }),
    })
  )
  async fileUpload(@UploadedFile() file) {
    console.error(file);
    return await this.uploadService.uploadFile(file, 1);
  }

  // @Post('/filehderma')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: './upload/hderma',
  //       filename: editFileName
  //     }),
  //   })
  // )
  // async fileUploadHderma(@UploadedFile() file, @Body('width') width: number, @Body('height') height: number) {
  //   //console.error(file);
  //   // return await this.mediaService.fileUpload(file);
  //   let url=''
  //   if(width!=0||height!=0)  
  //   {
  //   const resizedImageBuffer = await sharp(file.path).resize(150, 150,{ fit: 'inside' }).toBuffer();
  //   const newName = `./upload/hderma/${file.filename.replace(/_/g, '_mobile_')}`;
  //   url = await this.uploadService.bufferToFile(resizedImageBuffer,newName)     
  //   }
  //   return await this.uploadService.uploadFile(file,url, 2);
    
  // }

  @Post('/cloud')
  @UseInterceptors(FileInterceptor('file'))
  async uploadYoutube(@UploadedFile() file) {
    return this.uploadService.uploadYoutube(file);
  }

  @Post('/createfolder')
  createFolder() {
    return this.uploadService.createFolder();
  }
  @Get()
  findAll() {
    const rootPath = process.cwd();
    return rootPath;
    // return this.uploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUploadDto: UpdateUploadDto) {
    return this.uploadService.update(id, updateUploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string,@Body() data: any) {
    return this.uploadService.remove(id,data);
  }
}
