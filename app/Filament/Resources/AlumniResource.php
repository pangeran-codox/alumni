<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AlumniResource\Pages;
use App\Models\Alumni;
use App\Models\Angkatan;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class AlumniResource extends Resource
{
    protected static ?string $model = Alumni::class;

    protected static ?string $navigationIcon = 'heroicon-o-academic-cap';

    protected static ?string $navigationLabel = 'Alumni';

    protected static ?string $recordTitleAttribute = 'nama_lengkap';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Section::make('Data Pribadi')
                ->columns(2)
                ->schema([
                    TextInput::make('nama_lengkap')
                        ->required()
                        ->maxLength(255)
                        ->columnSpan(2),
                    TextInput::make('nama_panggilan')
                        ->maxLength(255),
                    TextInput::make('email')
                        ->email()
                        ->required()
                        ->unique(ignoreRecord: true)
                        ->maxLength(255),
                    TextInput::make('no_hp')
                        ->tel()
                        ->maxLength(30),
                    TextInput::make('kota_domisili')
                        ->maxLength(255),
                    Textarea::make('alamat')
                        ->columnSpan(2),
                ]),

            Section::make('Data Akademik')
                ->columns(3)
                ->schema([
                    Select::make('angkatan_id')
                        ->label('Angkatan')
                        ->relationship('angkatan', 'tahun')
                        ->searchable()
                        ->preload()
                        ->createOptionForm([
                            TextInput::make('tahun')->numeric()->required(),
                            TextInput::make('nama'),
                        ]),
                    TextInput::make('tahun_masuk')
                        ->numeric()
                        ->minValue(1990)
                        ->maxValue(now()->year + 1),
                    TextInput::make('tahun_lulus')
                        ->numeric()
                        ->minValue(1990)
                        ->maxValue(now()->year + 1),
                    TextInput::make('jurusan')
                        ->maxLength(255),
                    FileUpload::make('foto')
                        ->image()
                        ->directory('alumni-foto')
                        ->columnSpan(2),
                ]),

            Section::make('Pekerjaan')
                ->columns(2)
                ->schema([
                    TextInput::make('pendidikan_terakhir')
                        ->maxLength(255),
                    TextInput::make('pekerjaan')
                        ->maxLength(255),
                    TextInput::make('perusahaan')
                        ->maxLength(255),
                    TextInput::make('jabatan')
                        ->maxLength(255),
                ]),

            Section::make('Verifikasi')
                ->columns(2)
                ->schema([
                    Select::make('status_verifikasi')
                        ->options([
                            Alumni::STATUS_PENDING => 'Menunggu',
                            Alumni::STATUS_VERIFIED => 'Terverifikasi',
                            Alumni::STATUS_REJECTED => 'Ditolak',
                        ])
                        ->default(Alumni::STATUS_PENDING)
                        ->required()
                        ->native(false),
                    DateTimePicker::make('verified_at'),
                ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('foto')
                    ->circular()
                    ->defaultImageUrl(fn ($record) => 'https://ui-avatars.com/api/?name='.urlencode($record->nama_lengkap)),
                TextColumn::make('nama_lengkap')
                    ->searchable()
                    ->sortable()
                    ->description(fn (Alumni $record) => $record->jurusan),
                TextColumn::make('angkatan.tahun')
                    ->label('Angkatan')
                    ->sortable(),
                TextColumn::make('kota_domisili')
                    ->label('Kota')
                    ->toggleable(),
                TextColumn::make('pekerjaan')
                    ->toggleable()
                    ->placeholder('—'),
                TextColumn::make('status_verifikasi')
                    ->label('Status')
                    ->badge()
                    ->formatStateUsing(fn (string $state) => match ($state) {
                        Alumni::STATUS_VERIFIED => 'Terverifikasi',
                        Alumni::STATUS_PENDING => 'Menunggu',
                        Alumni::STATUS_REJECTED => 'Ditolak',
                        default => $state,
                    })
                    ->color(fn (string $state) => match ($state) {
                        Alumni::STATUS_VERIFIED => 'success',
                        Alumni::STATUS_PENDING => 'warning',
                        Alumni::STATUS_REJECTED => 'danger',
                        default => 'gray',
                    }),
                TextColumn::make('created_at')
                    ->label('Terdaftar')
                    ->dateTime('d M Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('status_verifikasi')
                    ->label('Status verifikasi')
                    ->options([
                        Alumni::STATUS_PENDING => 'Menunggu',
                        Alumni::STATUS_VERIFIED => 'Terverifikasi',
                        Alumni::STATUS_REJECTED => 'Ditolak',
                    ]),
                SelectFilter::make('angkatan_id')
                    ->label('Angkatan')
                    ->relationship('angkatan', 'tahun'),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListAlumni::route('/'),
            'create' => Pages\CreateAlumni::route('/create'),
            'edit' => Pages\EditAlumni::route('/{record}/edit'),
        ];
    }
}
