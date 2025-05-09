import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

Widget buildUserCard(String label, String value) {
  return Container(
    margin: const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
    width: double.infinity,
    decoration: BoxDecoration(
      borderRadius: BorderRadius.circular(10),
      border: Border.all(color: Colors.white, width: 1),
      boxShadow: [
        BoxShadow(
          color: Colors.black.withAlpha(100),
          blurRadius: 10,
          offset: const Offset(0, 0),
        ),
      ],
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
