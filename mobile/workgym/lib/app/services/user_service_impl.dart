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
  Future<bool> tryAutoLogin() =>
      _userRepository.tryAutoLogin();
}
