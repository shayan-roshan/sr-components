import { Component, h, State, Prop, Event, EventEmitter, Method } from '@stencil/core';

@Component({
  tag: 'sr-autocomplete',
  styleUrl: 'sr-autocomplete.css',
  shadow: true,
})
export class SrAutocomplete {
  @Prop() suggestions: string[] = [];
  @Prop() allowFreeText: boolean = false;

  @State() filtered: string[] = [];
  @State() inputValue: string = '';

  @Event() select: EventEmitter<string>;

  @Method()
  async resetInput(): Promise<void> {
    this.inputValue = '';
    this.filtered = [];
  }

  private onInput = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    this.inputValue = value;
    this.filtered = this.suggestions.filter(item =>
      item.toLowerCase().includes(value.toLowerCase())
    );
  };

  private onSelect = (item: string) => {
    this.inputValue = item;
    this.filtered = [];
    this.select.emit(item);
  };

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && this.allowFreeText && this.inputValue.trim()) {
      this.select.emit(this.inputValue.trim());
      this.filtered = [];
    }
  };

  render() {
    return (
      <div class="autocomplete">
        <input
          type="text"
          value={this.inputValue}
          onInput={this.onInput}
          onKeyDown={this.onKeyDown}
        />
        {this.filtered.length > 0 && (
          <ul class="dropdown">
            {this.filtered.map(item => (
              <li onClick={() => this.onSelect(item)}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
