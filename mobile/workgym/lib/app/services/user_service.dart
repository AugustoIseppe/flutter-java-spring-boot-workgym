
abstract class UserService {
  Future<String> login(String login, String password);
  Future<Map<String, dynamic>?> tryAutoLogin(String token);
}