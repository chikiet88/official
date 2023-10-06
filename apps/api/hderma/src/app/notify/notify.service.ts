import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateNotifyDto } from "./dto/create-notify.dto";
import { UpdateNotifyDto } from "./dto/update-notify.dto";
import { NotifyEntity } from "./entities/notify.entity";
import { UsersEntity } from "../users/entities/user.entity";
import * as firebase from 'firebase-admin';
@Injectable()
export class NotifyService {
  constructor(
    @InjectRepository(NotifyEntity)
    private NotifyRepository: Repository<NotifyEntity>,
    @InjectRepository(UsersEntity)
    private UserRepository: Repository<UsersEntity>,

  ) {
    firebase.initializeApp({
      credential: firebase.credential.cert(
        {
          projectId: "hderma-e806b",
          privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDC8im1jFpthg9/\n+OKFvsERSjhCdh+SIF0wQoeXs8UtSysFJJaJjV31Pz9DjVVJ2MdKIrtWqX4C6NkK\n8dz1xpAboaht6jOtu5RMNV/RCLwZZU9gfSHcY7cYy3faABys+ZgtZLxu13Jsfap8\nwBGPEhBekzDHPlsZy1Mo5POGyrYd9FmnoqFZhRGg5kwvo0132yALGe+dKX+ufCL+\nc+mIAd1G+aS+j8fluqO62MY5zMYYKlo3RzhchYrleQbdWaPEIafLNSlAWm6m1xcO\nFe0t2Za3IZ8wYD5hB7/nziz6R3jZSSvxb7XlAESoXTLxVcS62auxZ2E2mrYiAbHb\nu1ngExsVAgMBAAECggEASge7RhnEF1ZzGWZy41ZirAWy4q5H4+6NZO/G3RmkFcS3\nVA8maZr5JNJ9XFJWIqKDX8hbuxfHZiR1k73wapcaj5uuwfrP4DhdIymbtt5py/0Y\njSxHyRFG7VALNgqX2So5m3dnRXJkngWE0jYAFQRHmhqsSeWIo/1+GYgEYNonGa1Q\nuAk0z3sl64ecQYG0PRgAco18elN2P9UVsNl63xFVNpUbAj1X/8DFuZwXsaTp7Dmx\nZQy8RmimkebOy8dDQif/ULaBXNaIr7Py/AuxjLCrmS5fiVo31gmQm4gS8hNdIS/u\neMHxOQcDwhrgsVCG0LYarcL6Wm2Hkf23DHmsfH1n+wKBgQDu0CP97rautu7krh7Y\n1KdYwE/r/hcQc+Pm1OcZK7N63vDlomgwygu2BaV2Jbh2ueBgokp/EBm8HBV2mLeL\nHohL6rmAaSwFwbuSko3K91+P7pAdHs5hlx6i4eGE4LANEEm1v5yj0VTJhIbeWEeS\njBzm+yAUXkR5cy8iDHQju5mWswKBgQDQ+dIfmgVLrOV7kB/VJpOF2FbjwvOCC2xn\np0W/skBMsWHll7MbGx6zF7V+Mc+M92DsIqNqOKA8uIk9fQGvtk52+APISD58qaqy\nEPgZUk3QJOyTU6LP9DV2PDFqYsZ2mHN9SPrVHD2z60glKnMrh7BanuF4SkjQPqCE\nv/2Okm+rFwKBgAUBvB9wx8e18iA9PkxReQi1T3elJhqkM1z9jbLLZcHntqk51HFh\nawlv6N4nQEzM7NVZ0bIERmXZOOH5pa92/miJDUaR7ehY/XO/OtXMheZgnAjgQndt\nUakcjzvX8hj0BHeZAtG0a9ClxKYYt7ds1JZLIYsLxue88HoIRM8S+c9dAoGBAJf1\nkb45GbC1wQng+8TbkFq7vjNRCBGAjQuyrx1+WRNryWxSq4MCbYh9rRRe1DYFjQ0p\nAvuywZJl/iYgSKGlR9lq8BUrs4SjO+TQQhjnqH262+0l3DartlSL4MMjoH2Mzi5E\na2Gcb6HtbUDZZXY57Rt4fSwjmF8Vq1Pc6FxMT7dxAoGBAIomWfuh2a+8muZkieHw\npc5XvBzgiSBD7IsmIRtsP8tWrqlWIJAOPPJcLHFIJHknSL3S2ojKT6+GAdMHkCl/\nBDVX6T0BtG2pi4oJd/7vy8YvThrHYCWQ5F88mGQjhYaEaeD7sR+213h/OXK6vB5u\nUTZDcNTdoyq8DWsP0+I5xq+R\n-----END PRIVATE KEY-----\n",
          clientEmail: "firebase-adminsdk-2cq48@hderma-e806b.iam.gserviceaccount.com",
        },
      )
    });
  }
  async create(createNotifyDto: CreateNotifyDto) {
    this.NotifyRepository.create(createNotifyDto);
    const result = await this.NotifyRepository.save(createNotifyDto);
    return result
  }
  async findAll() {
    return await this.NotifyRepository.find();
  }
  async pushnoti(data: any) {
    const users = await this.UserRepository.findOne({ where: { id: data.idUser } });
    if (users.fcmToken && users.fcmToken.length > 0) {
      const messagePayload = {
        notification: {
          title: data.Title,
        },
        tokens: users.fcmToken,
        android: {
          notification: {
            title: data.Title,
            clickAction: data.Link
          }
        },
        apns: {
          payload: {
            aps: {
              alert: {
                title: "Hderma",
                body: "Bob wants to play poker",
              },
              badge: 5
            },
            acme1: "bar",
            acme2: ["bang", "whiz"]
          }
        },
        webpush: {
          fcmOptions: {
            link: data.Link
          }
        },
      };
      await firebase.messaging().sendMulticast(messagePayload);
    }
  }
  async findOne(id: string) {
    return await this.NotifyRepository.findOne({ where: { id: id } });
  }
  async findByidUser(id: string) {
    return await this.NotifyRepository.find({ where: { idUser: id } });
  }
  async update(id: string, data: Partial<UpdateNotifyDto>) {
    await this.NotifyRepository.update({ id }, data);
    return await this.NotifyRepository.findOne({ id });
  }
  async remove(id: string) {
    await this.NotifyRepository.delete({ id });
    return { deleted: true };
  }
}  