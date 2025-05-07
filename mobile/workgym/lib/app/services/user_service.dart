
abstract class UserService {
  Future<String> login(String login, String password);
  Future<bool> tryAutoLogin();
  Future<Map<String, dynamic>> getMe(String token); // <--- ADICIONADO AQUI
}