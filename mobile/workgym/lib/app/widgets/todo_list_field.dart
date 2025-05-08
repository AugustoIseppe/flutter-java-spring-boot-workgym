// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:flutter/material.dart';


class TodoListField extends StatelessWidget {
  final String label;
  final bool obscureText;
  final IconButton? suffixIconButton;
  final ValueNotifier<bool> obscureTextVN;
  final TextEditingController? controller;
  final FormFieldValidator<String>? validator;
  final FocusNode? focusNode;

  TodoListField({
    super.key,
    required this.label,
    this.obscureText = false,
    this.suffixIconButton,
    ValueNotifier<bool>? obscureTextVN,
    this.controller,
    this.validator,
    this.focusNode,
  })  : assert(
          obscureText == true ? suffixIconButton == null : true,
          'obscureText não pode ser enviado em conjunto com suffixIconButton',
        ),
        obscureTextVN = obscureTextVN ?? ValueNotifier<bool>(obscureText);

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<bool>(
      valueListenable: obscureTextVN,
      builder: (_, obscureTextValue, child) {
        return TextFormField(
          focusNode: focusNode,
          controller: controller,
          validator: validator,
          style: const TextStyle(color: Colors.white),
          decoration: InputDecoration(
            labelText: label,
            labelStyle: const TextStyle(color: Colors.white70, fontSize: 16),
            filled: true,
            fillColor: Colors.white.withValues(alpha: .05),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide(
                color: Colors.white.withValues(alpha: .05),
              ),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: const BorderSide(
                color: Colors.blueAccent,
                width: 1.5,
              ),
            ),
            errorBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: const BorderSide(color: Colors.red),
            ),
            focusedErrorBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: const BorderSide(color: Colors.redAccent),
            ),
            isDense: true,
            suffixIcon: suffixIconButton ??
                (obscureText
                    ? IconButton(
                        icon: Icon(
                          obscureTextValue
                              ? Icons.visibility_off
                              : Icons.visibility,
                          size: 18,
                          color: Colors.white70,
                        ),
                        onPressed: () {
                          obscureTextVN.value = !obscureTextValue;
                        },
                      )
                    : null),
          ),
          obscureText: obscureTextValue,
        );
      },
    );
  }
}

