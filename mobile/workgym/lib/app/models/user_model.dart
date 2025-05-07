//String name, String email, String password, String cpf, String login, UserRole role
class UserModel {
  String name;
  String email;
  String password;
  String cpf;
  String login;
  String role;
  String? accessToken;

  UserModel({
    required this.name,
    required this.email,
    required this.password,
    required this.cpf,
    required this.login,
    required this.role,
    this.accessToken,
  });

  Map<String, dynamic> toMap() {
    return {
      'name': name,
      'email': email,
      'password': password,
      'cpf': cpf,
      'login': login,
      'role': role, // Convert enum to string
      'accessToken': accessToken,
    };
  }

  factory UserModel.fromMap(Map<String, dynamic> json) {
    return UserModel(
      name: json['name'],
      email: json['email'],
      password: json['password'],
      cpf: json['cpf'],
      login: json['login'],
      role: json['role'],
      accessToken: json['accessToken'],
    );
  }

  UserModel copyWith({
    String? name,
    String? email,
    String? password,
    String? cpf,
    String? login,
    String? role,
    String? accessToken,
  }) {
    return UserModel(
      name: name ?? this.name,
      email: email ?? this.email,
      password: password ?? this.password,
      cpf: cpf ?? this.cpf,
      login: login ?? this.login,
      role: role ?? this.role,
    );
  }
}
