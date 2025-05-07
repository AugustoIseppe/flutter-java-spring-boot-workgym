import 'package:flutter/material.dart';
import 'package:workgym/app/services/user_service.dart';

class LoginController extends ChangeNotifier {
  final UserService _userService;

  bool _isLoading = false;
  String? _error;

  bool get isLoading => _isLoading;
  String? get error => _error;

  LoginController({required UserService userService})
    : _userService = userService;

  Future<String> login(String login, String password) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final response = await _userService.login(login, password);
      return response;
    } catch (e) {
      _error = 'Erro ao fazer login: $e';
      return "";
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
}
