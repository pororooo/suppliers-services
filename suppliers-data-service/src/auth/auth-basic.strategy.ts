import { BasicStrategy as Strategy } from 'passport-http';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      passReqToCallback: true,
    });
  }
  private readonly logger = new Logger(BasicStrategy.name);
  public validate = async (
    req,
    username: string,
    password: string,
  ): Promise<boolean> => {
    if (
      this.configService.get<string>('HTTP_BASIC_USERNAME') === username &&
      this.configService.get<string>('HTTP_BASIC_PASSWORD') === password
    ) {
      this.logger.log('Succeed authorization');
      return true;
    }
    throw new UnauthorizedException();
  };
}
