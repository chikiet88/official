import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { UploadEntity } from './entities/upload.entity';
import { google, drive_v3, Auth, Common, youtube_v3 } from 'googleapis';
import fs = require('fs');
// import ff = require('fluent-ffmpeg');
import stream = require('stream');
import path = require('path');
let bufferStream = new stream.PassThrough();
const auth: Auth.GoogleAuth = new google.auth.GoogleAuth({
  keyFile: './keydriveapi.json',
  scopes: [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/youtube',
  ],
});
const authYoutube: Auth.OAuth2Client = new google.auth.OAuth2({
  clientId:
    '287950542192-mgsrn3rgsb47lt4lpodqh1dd2bmrojms.apps.googleusercontent.com',
  redirectUri: 'https://v2.tazagroup.vn',
  clientSecret: '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',
});
const service: drive_v3.Drive = google.drive({
  version: 'v3',
  auth,
});
const Youtube: youtube_v3.Youtube = google.youtube({
  version: 'v3',
  auth: authYoutube,
});
const url = authYoutube.generateAuthUrl();
authYoutube.credentials.access_token =
  'ya29.a0Aa4xrXNcSdsxkxSHxgKkwxOGPP7iGkx4Go92jE_3HdYmFHUDp9dM9fuOvD8JZf5urMit8WzU308UZCIW13UmkYnwVoTuUaIiL0YIrfmq_E7S7DK8O9fL6ASfIZ7EackGGqaO7idhBpYKbpPjUe-GDMtgKf6BaCgYKATASARMSFQEjDvL94mBd1I-oq2ycWSgthDWocw0163';
@Injectable()

export class UploadService {
  constructor(
    @InjectRepository(UploadEntity)
    private UploadRepository: Repository<UploadService>
  ) {}
  async create(createUploadDto: CreateUploadDto) {
    this.UploadRepository.create(createUploadDto);
    return await this.UploadRepository.save(createUploadDto);
  }
  async findAll() {
    return await this.UploadRepository.find();
  }
  async findOne(id: string) {
    return await this.UploadRepository.findOne({ where: { id: id } });
  }
  async update(id: string, updateUploadDto: UpdateUploadDto) {
    await this.UploadRepository.update(id, updateUploadDto);
    return await this.UploadRepository.findOne({ where: { id: id } });
  }

  async remove(id:string,data:any) {
     if (fs.existsSync('/home/tazaspac/images/'+data.spath)) {
        fs.unlinkSync('/home/tazaspac/images/'+data.spath);
        await this.UploadRepository.delete(id);
        return { deleted: true };
      } 
     else
      {
        console.error(false);
        return false;
      }
  }
  async upload(item: any) {
    //bufferStream.end(item.buffer);
    try {
      const absolutePath = item.path;
      const rootPath = '/home/tazaspac/images';   
      const relativePath = path.relative(rootPath, absolutePath);
      // const parts = item.path.split('/');
      // const extractedPath = parts.slice(2).join('/');
      let data = {
        name: item.originalname,
        //idDrive: res.data.id||'',
        Mime: item.mimetype,
        spath:relativePath,
        alt: item.alt,
      }; 
      console.error(data);
      console.error(relativePath);
      return this.create(data);
    } catch (err) {
      throw err;
    }
  }
  async uploadlocal(item: any) {
    try {
      const host = 'https://images.tazagroup.vn/'
      const absolutePath = item.path;
      const rootPath = '/home/tazaspac/images';   
      const relativePath = path.relative(rootPath, absolutePath);
      let data = {
        name: item.originalname,
        Mime: item.mimetype,
        spath:host+relativePath,
        alt: item.alt,
      }; 
      return this.create(data);
    } catch (err) {
      throw err;
    }
  }





  async bufferToFile(buffer: Buffer, fileName: string): Promise<string> {
    const filePath = path.resolve(fileName);
   // const filePath = path.relative('D:\\Congty\\Api\\tazagroup',fileName);
    const stream = fs.createWriteStream(fileName);
    const writable: stream.Writable = stream;
    writable.write(buffer);
    writable.on('error', (err) => {
      console.error(`Error writing to file ${fileName}: ${err}`);
      stream.destroy();
    });
    writable.on('finish', () => {
      console.log(`Data written to file ${fileName} successfully`);
      stream.close();
    });
    writable.end();
    return filePath;
  }
  async getVideo() {}
  async uploadYoutube(file) {
    let a =  bufferStream.end(file.buffer);
    console.error(a);
    console.error(url);
    const res2 = await Youtube.videos.insert({
      part: ['snippet,status'],
      requestBody: {
        snippet: {
          title: file.name,
          description: file.Mota,
          tags: file.tags,
        },
        status: {
          privacyStatus: 'private',
        },
      },
      media: {
        body: bufferStream,
      },
    });
    return res2.data;
  }
  async createFolder() {
    const fileMetadata = {
      name: 'Test Tài Liệu Nguồn',
      mimeType: 'application/vnd.google-apps.folder',
      driveId: '0AKQL50NKsue5Uk9PVA',
      teamDriveId: '0AKQL50NKsue5Uk9PVA',
      parents: ['1AWsiA4g7sSxEfgy3udIrRuUb0nS3JS-h'],
    };
    try {
      const file = await service.files.create({
        requestBody: fileMetadata,
        supportsAllDrives: true,
        supportsTeamDrives: true,
        fields: 'id',
      });
      console.log('Folder Id:', file.data.id);
      return file.data.id;
    } catch (err) {
      throw err;
    }
  }
  async createFileDrive(
    item: any,
    driveId: any = '0AKQL50NKsue5Uk9PVA',
    parents: any[] = ['1uSvWq-sN0Skr1ejHZsHYF0pPr14d4ZM_']
  ) {
    const fileMetadata = {
      name: item.name,
      mimeType: '',
      driveId: driveId,
      teamDriveId: driveId,
      parents: parents,
    };
    if (item.Type == 1) {
      fileMetadata.mimeType = 'application/vnd.google-apps.document';
    }
    if (item.Type == 2) {
      fileMetadata.mimeType = 'application/vnd.google-apps.presentation';
    }
    if (item.Type == 3) {
      fileMetadata.mimeType = 'application/vnd.google-apps.spreadsheet';
    }
    try {
      const file = await service.files.create({
        requestBody: fileMetadata,
        supportsAllDrives: true,
        supportsTeamDrives: true,
        fields: 'id,name',
      });
      await service.permissions.create({
        fileId: file.data.id,
        requestBody: {
          role: 'writer',
          type: 'anyone',
        },
        supportsAllDrives: true,
        supportsTeamDrives: true,
      });
      console.error('Folder Id:', file);

      let URLData = ``;

      if (item.Type == 1) {
        URLData = `https://docs.google.com/document/d/${file.data.id}/edit`;
      }
      if (item.Type == 2) {
        URLData = `https://docs.google.com/presentation/d/${file.data.id}/edit`;
      }
      if (item.Type == 3) {
        URLData = `https://docs.google.com/spreadsheets/d/${file.data.id}/edit`;
      }
      console.error(file.data)
      let data = {
        url: URLData,
        name: file.data.name,
        idDrive: file.data.id,
        idLink: '',
        type: item.Type,
      };
      return this.create(data);
    } catch (err) {
      throw err;
    }
  }
  async uploadFile(
    item: any,
    driveId: any = '0AKQL50NKsue5Uk9PVA',
    parents: any[] = ['1uSvWq-sN0Skr1ejHZsHYF0pPr14d4ZM_']
  ) {
    const baseurl ='./upload/';
    bufferStream.end(item.buffer);
    try {
      const res = await service.files.create({
        requestBody: {
          name: item.originalname,
          mimeType: item.mimetype,
          driveId: driveId,
          teamDriveId: driveId,
          parents: parents,
        },
        supportsAllDrives: true,
        supportsTeamDrives: true,
        media: {
          mimeType: item.mimeType,
          body: fs.createReadStream(`${baseurl}${item.filename}`),
        },
      });
      await service.permissions.create({
        fileId: res.data.id,
        requestBody: {
          role: 'writer',
          type: 'anyone',
        },
        supportsAllDrives: true,
        supportsTeamDrives: true,
      });
      let data = {
        name: res.data.name,
        idDrive: res.data.id,
        Mime: item.mimetype,
        url:item.path,
      };
      return this.create(data);
    } catch (err) {
      throw err;
    }
  }
  async uploadFileNew(
    item: any,
    pathmobile:any,
    driveId: any = '0AKQL50NKsue5Uk9PVA',
    parents: any[] = ['1uSvWq-sN0Skr1ejHZsHYF0pPr14d4ZM_']
  ) {
    const baseurl ='./upload/hderma/';
    bufferStream.end(item.buffer);
    try {
      const res = await service.files.create({
        requestBody: {
          name: item.originalname,
          mimeType: item.mimetype,
          driveId: driveId,
          teamDriveId: driveId,
          parents: parents,
        },
        supportsAllDrives: true,
        supportsTeamDrives: true,
        media: {
          mimeType: item.mimeType,
          body: fs.createReadStream(`${baseurl}${item.filename}`),
        },
      });

      await service.permissions.create({
        fileId: res.data.id,
        requestBody: {
          role: 'writer',
          type: 'anyone',
        },
        supportsAllDrives: true,
        supportsTeamDrives: true,
      });
      let data = {
        name: res.data.name,
        idDrive: res.data.id,
        Mime: item.mimetype,
        url:item.path,
        pathmobile:pathmobile
      };
      return this.create(data);
    } catch (err) {
      throw err;
    }
  }

  async uploadToFolder(file) {
    const res = await service.files.create({
      requestBody: {
        name: file.filename,
        mimeType: file.mimeType,
        driveId: '0AKQL50NKsue5Uk9PVA',
        teamDriveId: '0AKQL50NKsue5Uk9PVA',
        parents: ['1AWsiA4g7sSxEfgy3udIrRuUb0nS3JS-h'],
      },
      supportsAllDrives: true,
      supportsTeamDrives: true,
      media: {
        mimeType: file.mimeType,
        body: fs.createReadStream(`./upfiles/${file.filename}`),
      },
    });
    let URLData = `https://drive.google.com/file/d/${res.data.id}/preview`;
    await service.permissions.create({
      fileId: res.data.id,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
      supportsAllDrives: true,
      supportsTeamDrives: true,
    });

    //await this.DeleteFile(`./upfiles/${file.filename}`);
    let data = {
      url: URLData,
      name: file.filename,
      idDrive: res.data.id,
      idLink: '',
    };
    return this.create(data);
  }

  async DeleteFile(path: any) {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
      return true;
    } else {
      console.error(false);
      return false;
    }
  }
  
}
