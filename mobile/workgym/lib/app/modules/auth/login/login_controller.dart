import 'package:flutter/material.dart';
import 'package:workgym/app/services/user_service.dart';
import 'package:workgym/app/models/user_model.dart';
import 'dart:convert';
import 'package:workgym/app/data/store.dart';

class LoginController extends ChangeNotifier {
  final UserService _userService;

  bool _isLoading = false;
  String? _error;
  bool _isSuccess = false;
  UserModel? _user;  // Adiciona a propriedade que armazena o usuário.

  bool get isLoading => _isLoading;
  String? get error => _error;
  bool get success => _isSuccess;
  UserModel? get user => _user;  // Getter para o usuário

  LoginController({required UserService userService})
      : _userService = userService;

  Future<String> login(String login, String password) async {
    _isLoading = true;
    _error = null;
    _isSuccess = false;
    notifyListeners();

    try {
      final response = await _userService.login(login, password);
      _isSuccess = response.isNotEmpty;

      // Ao fazer login, armazene os dados do usuário
      if (_isSuccess) {
        final userData = jsonDecode(response);
        _user = UserModel.fromMap(userData);
        // Salve o usuário no SharedPreferences
        await Store.saveString('user', jsonEncode(_user!.toMap()));
      }

      return response;
    } catch (e) {
      _error = 'Erro ao fazer login: $e';
      return "";
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<bool> tryAutoLogin() async {
    _isLoading = true;
    notifyListeners();

    try {
      final result = await _userService.tryAutoLogin();
      if (result) {
        // Ao fazer auto login, carrega os dados do usuário
        final userData = await Store.getString('user');
        if (userData.isNotEmpty) {
          _user = UserModel.fromMap(jsonDecode(userData));
        }
      }
      return result;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  // Limpar os dados do usuário se necessário (logout)
  void logout() {
    _user = null;
    Store.remove('user');  // Remover dados do SharedPreferences
    notifyListeners();
  }
}
