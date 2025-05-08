import 'package:workgym/app/repositories/user_repository.dart';
import 'package:workgym/app/services/user_service.dart';

class UserServiceImpl implements UserService {
  final UserRepository _userRepository;
  UserServiceImpl({required UserRepository userRepository})
    : _userRepository = userRepository;

  @override
  Future<String> login(String login, String password) =>
      _userRepository.login(login, password);

  @override
  Future<bool> tryAutoLogin() => _userRepository.tryAutoLogin();

  // Implementação do método getMe no UserServiceImpl
  @override
  Future<Map<String, dynamic>> getMe(String token) {
    // Delega a chamada para o método getMe do UserRepository
    // que já está implementado no seu UserRepositoryImpl.dart
    return _userRepository.getMe(token);
  }
  
  @override
  Future<List<String>> getWeekDay(String userId) =>
      _userRepository.getWeekDay(userId);

}
