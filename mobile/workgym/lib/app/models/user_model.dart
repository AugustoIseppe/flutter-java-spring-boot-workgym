class UserModel {
  String id;
  String name;
  String email;
  String cpf;
  String login;
  String role;
  UserModel({
    required this.id,
    required this.name,
    required this.email,
    required this.cpf,
    required this.login,
    required this.role,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'name': name,
      'email': email,
      'cpf': cpf,
      'login': login,
      'role': role, // Convert enum to string
    };
  }

  factory UserModel.fromMap(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'],
      name: json['name'],
      email: json['email'],
      cpf: json['cpf'],
      login: json['login'],
      role: json['role'],
    );
  }

  UserModel copyWith({
    String? id,
    String? name,
    String? email,
    String? cpf,
    String? login,
    String? role,
  }) {
    return UserModel(
      id: id ?? this.id,
      name: name ?? this.name,
      email: email ?? this.email,
      cpf: cpf ?? this.cpf,
      login: login ?? this.login,
      role: role ?? this.role,
    );
  }

  @override
  String toString() {
    return 'UserModel(id: $id, name: $name, email: $email, cpf: $cpf, login: $login, role: $role)';
  }
}
