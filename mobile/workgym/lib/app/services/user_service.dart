
abstract class UserService {
  Future<String> login(String login, String password);
  Future<bool> tryAutoLogin();
}