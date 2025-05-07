
abstract class UserRepository {
  Future<String> login(String login, String password);
  Future<bool> tryAutoLogin();
  Future<Map<String, dynamic>> getMe(String token);
}