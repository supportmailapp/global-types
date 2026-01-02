import { ComponentType, TextInputStyle } from "discord-api-types/v10";
import { Schema } from "mongoose";
import { z } from "zod";

export type ModalComponentType =
  | ComponentType.TextInput
  | ComponentType.TextDisplay
  | ComponentType.StringSelect
  | ComponentType.File;

type IBaseFormComponent<T extends ModalComponentType> = {
  /**
   * The type of the component.
   */
  type: T;
  /**
   * The label of the form field.
   *
   * Max. chars: 45
   */
  label: string;
  /**
   * A random unqiue identifier for the component. Default should to a snowflake-like string.
   */
  id: string;
  /**
   * Whether the component is required or not.
   */
  required?: boolean;
  /**
   * The description of the form field.
   *
   * Max. chars: 100
   */
  description?: string;
  /**
   * The placeholder text for the component.
   */
  placeholder: string;
};

interface ITextDisplayComponent extends Omit<IBaseFormComponent<ComponentType.TextDisplay>, "placeholder"> {
  content: string;
}

interface ITextInputComponent extends IBaseFormComponent<ComponentType.TextInput> {
  style: TextInputStyle;
  minLength?: number;
  maxLength?: number;
  defaultValue?: string;
}

interface IBaseSelectMenuComponent<T extends ModalComponentType> extends IBaseFormComponent<T> {
  minValues?: number;
  maxValues?: number;
}

interface IStringSelectComponent extends IBaseSelectMenuComponent<ComponentType.StringSelect> {
  options: IStringSelectOption[];
}

interface IStringSelectOption {
  id?: string;
  label: string;
  value: string;
  description?: string;
  emoji?: string;
  default?: boolean;
}

interface IFileUploadComponent extends Omit<IBaseFormComponent<ComponentType.File>, "placeholder"> {
  /**
   * The label sent in the file thread along with their respective file(s).
   *
   * Max. chars: 100
   *
   * Example: "Evidence Upload"
   *
   * 3 Uploads:
   * - file1.png - 2MB
   * - file2.jpg - 3MB
   * - file3.mp4 - 7MB
   *
   * Total Size: 12MB
   *
   * Messages:
   * 1. Evidence Upload - file1.png, file2.jpg
   * 2. Evidence Upload - file3.mp4 (because it would exceed the size limit if added to message 1)
   *
   * ---
   *
   * If not set or empty, `this.label` of the field will be used instead.
   */
  messageLabel?: string;
  /**
   * Represents `minFiles` for the file upload component.
   */
  minValues?: number;
  /**
   * Represents `maxFiles` for the file upload component.
   */
  maxValues?: number;
}

export type IFormComponent =
  | ITextDisplayComponent
  | ITextInputComponent
  | IStringSelectComponent
  | IFileUploadComponent;

export type AnyAPIFormComponent = IFormComponent & { _id?: string };
export type APIFormComponent<T extends ComponentType> = Extract<AnyAPIFormComponent, { type: T }>;

export const formStringSelectOptionSchema = new Schema<IStringSelectOption>({
  label: { type: String, required: true, maxlength: 45 },
  value: { type: String, required: true, maxlength: 100 },
  description: { type: String, required: false, maxlength: 100 },
  emoji: { type: String, required: false, maxlength: 100 },
  default: { type: Boolean, required: false, default: false },
});

export const CustomModalFieldSchema = new Schema<IFormComponent>({
  type: { type: Number, required: true },
  id: { type: String, required: true, minlength: 17, maxlength: 23 },
  required: { type: Boolean, default: false },
  content: { type: String, required: false },
  placeholder: { type: String, required: false },
  style: { type: Number, required: false },
  label: { type: String, required: false, minlength: 1, maxlength: 45 },
  description: { type: String, required: false, maxlength: 100 },
  minLength: { type: Number, required: false, min: 0, max: 4000 },
  maxLength: { type: Number, required: false, min: 1, max: 4000 },
  defaultValue: { type: String, required: false, minlength: 0, maxlength: 4000 },
  minValues: { type: Number, required: false, min: 0, max: 25 },
  maxValues: { type: Number, required: false, min: 1, max: 25 },
  messageLabel: { type: String, required: false, maxlength: 100 },
  options: { type: [formStringSelectOptionSchema], required: false },
});
