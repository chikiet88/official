import { Injectable } from '@nestjs/common';
import { CreateApightkDto } from './dto/create-apightk.dto';
import { UpdateApightkDto } from './dto/update-apightk.dto';
import FormData = require('form-data');
import axios from 'axios';
@Injectable()
export class ApightkService {
  create(createApightkDto: CreateApightkDto) {
    return 'This action adds a new apightk';
  }
  findAll() {
    return `This action returns all apightk`;
  }

  findOne(id: number) {
    return `This action returns a #${id} apightk`;
  }

  update(id: number, updateApightkDto: UpdateApightkDto) {
    return `This action updates a #${id} apightk`;
  }

  remove(id: number) {
    return `This action removes a #${id} apightk`;
  }
  async getphiship(dulieu: any) {   
    const axios = require('axios');
    let data = JSON.stringify({
      pick_province:dulieu.pick_province,
      pick_district: dulieu.pick_district,
      province: dulieu.province,
      district: dulieu.district
    });
    
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://services.giaohangtietkiem.vn/services/shipment/fee',
      headers: { 
        'Token': 'caf78c341a2161cacf29aab0bbc785a9f1d30256', 
        'Content-Type': 'application/json', 
        // 'Cookie': 'XSRF-TOKEN=eyJpdiI6InYvcXZ0RStVcWl4dHdydVowcktiYkE9PSIsInZhbHVlIjoiQllFZlArS2FBSENlOGFvVnd6VTg4WHZjckg4T01pQjlJVC9oZjRIeUVha3BraUhBTllzZFRjbjBmQkVVTndNdEllWUJadUI5MDFqMVZKTmtiN2x1ZnJCR1pCUDVzMEJxbWxWYjFkNGMwOUpyNUpzSlo1TnVSU215QmNBL0k5a20iLCJtYWMiOiIzZTU5ZDFkNDk4M2ViZDBmNzU4M2Y4NzMxMzI5YzQyMWNiNDNhZGViZWExYzEzNjQyODcyMmJiMDkzZGNkMDczIiwidGFnIjoiIn0%3D; ghtk_basic_session=eyJpdiI6IkJyeHlKdXAxeU5UVmZsSzhTRS9qZlE9PSIsInZhbHVlIjoiUkw1K2JjakJnQlA4Qm5zMUIzd2ViVFN1L3NQWC9kb2p4OTJvbjNBcHVmUVJ4OVdyeng4b2JHMHRCMHd1THpXVDh4bnE4YlRlVkFNeW5OMENNdkRiUTVJMVd0ZjJoK2hvUEhta3hUeXpOeXErajRGdnJxZUl4TnZnMW1XL3pRQUkiLCJtYWMiOiI3ODY5YzVkMGQ5NmVkMDg2ZTU2MjQ1ZmQ2ZTNkZmM1MDE1YjliYmJmNWVlZTJkMTRlMGZmNWU4NjZkYjYyNzQxIiwidGFnIjoiIn0%3D'
      },
      data : data
    };
    
   return  axios.request(config)
    .then((response:any) => {
      return response.data
      //returnconsole.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  }    
}
