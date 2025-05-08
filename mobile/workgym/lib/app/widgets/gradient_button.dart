import 'package:flutter/material.dart';

class GradientButton extends StatelessWidget {
  final String text;
  final VoidCallback onPressed;
  final bool isOutlined;

  const GradientButton({
    super.key,
    required this.text,
    required this.onPressed,
    this.isOutlined = false,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 55,
      width: double.infinity,
      child: DecoratedBox(
        decoration: BoxDecoration(
          gradient: isOutlined
              ? null
              : const LinearGradient(
                  colors: [Color.fromARGB(130, 24, 103, 222), Color.fromARGB(114, 60, 55, 211)],
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                ),
          border: isOutlined
              ? Border.all(color: Colors.blueAccent.withValues(alpha: .7), width: 1.5)
              : null,
          borderRadius: BorderRadius.circular(12),
        ),
        child: TextButton(
          onPressed: onPressed,
          style: TextButton.styleFrom(
            foregroundColor: Colors.white,
            backgroundColor: Colors.transparent,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
          ),
          child: Text(
            text,
            style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
          ),
        ),
      ),
    );
  }
}
