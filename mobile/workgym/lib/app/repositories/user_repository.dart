
abstract class UserRepository {
  Future<String> login(String login, String password);
  Future<bool> tryAutoLogin();
  Future<Map<String, dynamic>> getMe(String token);
  Future<List<String>> getWeekDay(String userId);
}