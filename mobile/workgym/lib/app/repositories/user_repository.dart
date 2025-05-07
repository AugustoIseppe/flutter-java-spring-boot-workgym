
abstract class UserRepository {
  Future<String> login(String login, String password);
  Future<Map<String, dynamic>?> tryAutoLogin(String token);
  Future<Map<String, dynamic>> getMe(String token);
}