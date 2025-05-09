import 'package:flutter/material.dart';

Widget buildUserCard(String label, String value) {
  return Card(
    color: Colors.white.withValues(alpha: .85),
    margin: const EdgeInsets.symmetric(vertical: 8),
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
    child: ListTile(
      title: Text(
        label,
        style: const TextStyle(fontWeight: FontWeight.bold),
      ),
      subtitle: Text(value),
      leading: const Icon(Icons.person_outline),
    ),
  );
}
