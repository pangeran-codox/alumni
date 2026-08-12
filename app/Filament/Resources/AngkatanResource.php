<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AngkatanResource\Pages;
use App\Models\Angkatan;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class AngkatanResource extends Resource
{
    protected static ?string $model = Angkatan::class;

    protected static ?string $navigationIcon = 'heroicon-o-users';

    protected static ?string $navigationLabel = 'Angkatan';

    protected static ?string $recordTitleAttribute = 'tahun';

    public static function form(Form $form): Form
    {
        return $form->schema([
            TextInput::make('tahun')
                ->numeric()
                ->required()
                ->unique(ignoreRecord: true)
                ->minValue(1990)
                ->maxValue(now()->year + 1),
            TextInput::make('nama')
                ->maxLength(255)
                ->helperText('Opsional, misalnya nama wali kelas atau julukan angkatan.'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('tahun')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('nama')
                    ->placeholder('—'),
                TextColumn::make('alumni_count')
                    ->label('Jumlah alumni')
                    ->counts('alumni')
                    ->sortable(),
            ])
            ->defaultSort('tahun', 'desc');
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListAngkatan::route('/'),
            'create' => Pages\CreateAngkatan::route('/create'),
            'edit' => Pages\EditAngkatan::route('/{record}/edit'),
        ];
    }
}
