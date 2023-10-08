import { Injectable } from '@nestjs/common';
import { CreateApinhanhDto } from './dto/create-apinhanh.dto';
import { UpdateApinhanhDto } from './dto/update-apinhanh.dto';
import axios from 'axios';
import FormData = require('form-data');
import _ = require('lodash');
var JSONbig = require('json-bigint');
@Injectable()
export class ApinhanhService {
  constructor() { }
  async getToken(dulieu: any) {
    let data = new FormData();
    data.append('version', dulieu.version);
    data.append('appId',  dulieu.appId);
    data.append('accessCode', dulieu.accessCode);
    data.append('secretKey', dulieu.secretKey);
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: dulieu.url,
      headers: {
        ...data.getHeaders()
      },
      data: data
    };
  return await axios.request(config)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        return error
      });
  }
  async getSanpham(dulieu: any) {
    let data = new FormData();
    data.append('version', dulieu.version);
    data.append('appId',  dulieu.appId);
    data.append('accessToken', dulieu.accessToken);
    data.append('data', dulieu.params);
    data.append('businessId', dulieu.businessId);    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://open.nhanh.vn/api/product/search',
      headers: { 
        ...data.getHeaders()
      },
      data : data
    }; 
    return await axios.request(config)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return error
    });    
  }
  create(createApinhanhDto: CreateApinhanhDto) {
    return 'This action adds a new apinhanh';
  }

  findAll() {
    return `This action returns all apinhanh`;
  }

  findOne(id: number) {
    return `This action returns a #${id} apinhanh`;
  }

  update(id: number, updateApinhanhDto: UpdateApinhanhDto) {
    return `This action updates a #${id} apinhanh`;
  }

  remove(id: number) {
    return `This action removes a #${id} apinhanh`;
  }
}
