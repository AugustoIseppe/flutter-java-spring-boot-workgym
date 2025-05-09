import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

Widget buildUserCard(String label, String value) {
  return Card(
                      color: Colors.white10,
                      margin: const EdgeInsets.symmetric(
                        horizontal: 16,
                        vertical: 8,
                      ),
    child: ListTile(
      title: Text(label, style: GoogleFonts.merriweather(
        textStyle: const TextStyle(
          color: Colors.white,
          letterSpacing: .5,
          fontSize: 16,
        ),
      )),
      subtitle: Text(value , style: GoogleFonts.merriweather(
        textStyle: const TextStyle(
          color: Colors.white,
          letterSpacing: .5,
          fontSize: 14,
        ),
      )),
      leading: const Icon(Icons.person_outline, color: Colors.white),
    ),
  );
}
