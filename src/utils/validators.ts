// Components V2 validators

import {
  APIActionRowComponent,
  APIButtonComponent,
  APIComponentInActionRow,
  type APIContainerComponent,
  APIFileComponent,
  APIMediaGalleryComponent,
  type APIMessageTopLevelComponent,
  type APISectionComponent,
  ButtonStyle,
  ComponentType,
} from "discord-api-types/v10";
import {
  ActionRowBuilder,
  ButtonBuilder,
  ContainerBuilder,
  FileBuilder,
  MediaGalleryBuilder,
  SectionBuilder,
} from "@discordjs/builders";
import { SMAPIMessageTopLevelComponent } from "./helperTypes";

class ComponentsV2ValidatorError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ComponentsV2ValidatorError";
  }
}

export class ComponentsV2Validator {
  private components: APIMessageTopLevelComponent[];
  constructor(components: APIMessageTopLevelComponent[]) {
    this.components = components;
  }

  getComponents() {
    return this.components;
  }

  /**
   * Validates the components of a message.
   *
   * @returns The validated components.
   * @throws {ComponentsV2ValidatorError} If the components are invalid
   */
  validate(): SMAPIMessageTopLevelComponent[] {
    const path = (index: number) => `components[${index}]` as const;
    const validComponents: APIMessageTopLevelComponent[] = [];
    for (let i = 0; i < this.components.length; i++) {
      const component = this.components[i];
      switch (component.type) {
        case ComponentType.ActionRow: {
          if (this.validateActionRow(component, path(i)))
            validComponents.push(component);
          break;
        }
        case ComponentType.Container: {
          const res = this.validateContainer(component, path(i));
          validComponents.push(res);
          break;
        }
        case ComponentType.File: {
          const res = this.validateFile(component, path(i));
          validComponents.push(res);
          break;
        }
        case ComponentType.MediaGallery: {
          const res = this.validateMediaGallery(component, path(i));
          validComponents.push(res);
          break;
        }
        case ComponentType.Section: {
          const res = this.validateSection(component, path(i));
          validComponents.push(res);
          break;
        }
        default: {
          validComponents.push(component); // All other components are valid and don't have internal restrictions.
          break;
        }
      }
    }

    return validComponents as SMAPIMessageTopLevelComponent[];
  }

  /**
   * Only validates the action row component. Doesn't modify the component.
   *
   * If validation was successful, it returns true.
   */
  private validateActionRow(
    data: APIActionRowComponent<APIComponentInActionRow>,
    path: string
  ) {
    const actionRow = new ActionRowBuilder(data).toJSON();

    for (let i = 0; i < actionRow.components.length; i++) {
      const comp = actionRow.components[i];
      let _path = path + `.components[${i}]`;
      if (comp.type === ComponentType.Button) {
        this.validateLinkButton(comp, _path);
      }
    }

    return true;
  }

  /**
   * Only validates the link button. Doesn't modify the component.
   */
  private validateLinkButton(
    btn: ButtonBuilder | APIButtonComponent,
    path: string
  ) {
    const style = btn instanceof ButtonBuilder ? btn.data.style : btn.style;
    if (style !== ButtonStyle.Link) {
      throw new ComponentsV2ValidatorError(
        `Invalid component at '${path}'. Expected Button with Link style.`
      );
    }
    return true;
  }

  /**
   * Validates the container component and returns a modified version of it, if needed.
   */
  private validateContainer(
    data: APIContainerComponent,
    path: string
  ): APIContainerComponent {
    const container = new ContainerBuilder(data).toJSON();
    const validated: APIContainerComponent = {
      ...container,
      components: [],
    };

    for (let i = 0; i < container.components.length; i++) {
      const comp = container.components[i];
      let _path = path + `.components[${i}]`;
      switch (comp.type) {
        case ComponentType.ActionRow: {
          if (this.validateActionRow(comp, _path))
            validated.components.push(comp);
          break;
        }
        case ComponentType.Section: {
          this.validateSection(comp, _path);
          break;
        }
        case ComponentType.MediaGallery: {
          const res = this.validateMediaGallery(comp, _path);
          validated.components.push(res);
          break;
        }
        case ComponentType.File: {
          const res = this.validateFile(comp, _path);
          validated.components.push(res);
          break;
        }
        default: {
          validated.components.push(comp);
          break; // All other components are valid and don't have internal restrictions.
        }
      }
    }

    return validated;
  }

  private turnMediaIntoURLOnly<T extends { url: string }>(media: T) {
    return {
      url: media.url,
    };
  }

  private validateFile(data: APIFileComponent, _: string) {
    const file = new FileBuilder(data).toJSON();
    file.file = this.turnMediaIntoURLOnly(file.file);
    return file;
  }

  private validateSection(
    data: APISectionComponent,
    _: string
  ): APISectionComponent {
    const section = new SectionBuilder(data).toJSON();

    // Remove all properties from accessory (only keep url)
    if (typeof section.accessory !== "undefined") {
      if (section.accessory.type === ComponentType.Thumbnail) {
        section.accessory.media = {
          url: section.accessory.media.url,
        };
      }
    }

    return section;
  }

  private validateMediaGallery(data: APIMediaGalleryComponent, _: string) {
    const mediaGallery = new MediaGalleryBuilder(data).toJSON();

    mediaGallery.items = mediaGallery.items.map((item) => {
      item.media = this.turnMediaIntoURLOnly(item.media);
      return item;
    });

    return mediaGallery;
  }
}
