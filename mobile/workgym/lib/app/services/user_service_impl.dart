import 'package:workgym/app/dto/login_response_dto.dart';
import 'package:workgym/app/repositories/user_repository.dart';
import 'package:workgym/app/services/user_service.dart';

class UserServiceImpl implements UserService {
  final UserRepository _userRepository;
  UserServiceImpl({required UserRepository userRepository})
    : _userRepository = userRepository;

  @override
  Future<LoginResponseDto?> login(String login, String password) =>
      _userRepository.login(login, password);
      
        @override
        Future<Map<String, dynamic>?> tryAutoLogin(String token) => _userRepository.tryAutoLogin(token);
}
