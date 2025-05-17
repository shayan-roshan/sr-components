import { Component, h, State, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'sr-autocomplete',
  styleUrl: 'sr-autocomplete.css',
  shadow: true,
})
export class SrAutocomplete {
  @Prop() suggestions: string[] = [];
  @State() filtered: string[] = [];
  @State() inputValue: string = '';

  @Event() select: EventEmitter<string>;

  onInput = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    this.inputValue = value;
    this.filtered = this.suggestions.filter(item =>
      item.toLowerCase().includes(value.toLowerCase())
    );
  };

  onSelect = (item: string) => {
    this.inputValue = item;
    this.filtered = [];
    this.select.emit(item);
  };

  render() {
    return (
      <div class="autocomplete">
        <input type="text" value={this.inputValue} onInput={this.onInput} />
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
