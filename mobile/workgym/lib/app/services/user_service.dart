import 'package:workgym/app/dto/login_response_dto.dart';

abstract class UserService {
  Future<LoginResponseDto?> login(String login, String password);
  Future<Map<String, dynamic>?> tryAutoLogin(String token);
}