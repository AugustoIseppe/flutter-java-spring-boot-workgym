import 'package:flutter/material.dart';
import 'package:workgym/app/services/user_service.dart';
import 'package:workgym/app/dto/login_response_dto.dart';

class LoginController extends ChangeNotifier {
  final UserService _userService;

  bool _isLoading = false;
  String? _error;

  bool get isLoading => _isLoading;
  String? get error => _error;

  LoginController({required UserService userService})
    : _userService = userService;

  Future<LoginResponseDto?> login(String login, String password) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final response = await _userService.login(login, password);
      if (response == null) {
        _error = 'Usuário ou senha inválidos';
      }
      return response;
    } catch (e) {
      _error = 'Erro ao fazer login: $e';
      return null;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
}
